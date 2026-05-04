import Users from '../entities/Users.js';
import Roles from '../entities/Roles.js';
import { Gender } from '../interfaces/iUsers.js';
import { checkIfExistsByEmailAndNotId, save } from '../repositories/UserRepository.js';
import { getRoleByName } from '../repositories/RoleRepository.js';
import bcrypt from 'bcrypt';
import { BroadcasterResult } from 'typeorm/subscriber/BroadcasterResult.js';
import { pathToFileURL } from 'node:url';

const createUser = async (payload: {
    name: string,
    birthday: Date,
    gender: Gender,
    email: string,
    password: string,
    confirmationPassword: string
}): Promise<Users> => {
    if (!isValidName(payload.name)) {
        throw new Error("Deve ser informado o nome do usuário.");
    }
    if (!isValidBirthday(payload.birthday)) {
        throw new Error("A data de nascimento deve ser informada e deve ser uma data no passado.");
    }
    console.log(payload.password);
    if (!isValidPassword(payload.password)) {
        throw new Error("A senha deve conter no mínimo 10 caracteres com pelo menos uma letra maiúscula, uma letra minuscula, um número e um caractere especial");
    }
    if (payload.password !== payload.confirmationPassword) {
        throw new Error("A senha e sua confirmação não são iguais.");
    }
    if (!isValidEmail(payload.email)) {
        throw new Error("O email informado não está em formato de email");
    }
    if (await validateClearEmail(null, payload.email)) {
        throw new Error("Email já em uso.");
    }
    let user = new Users();
    user.name = payload.name;
    user.birthday = payload.birthday;
    user.email = payload.email;
    user.gender = payload.gender;
    user.passwordHash = await bcrypt.hash(payload.password, 10);

    // Defininando valores base
    let basicRole = await getRoleByName("geral") as Roles;
    if (basicRole === null) {
        throw new Error("Falha ao localizar função geral no sistema");
    } 
    user.roles = [basicRole];
    user.active = true;

    return save(user);
}

const validateClearEmail = async (idUser: number | null, email: string): Promise<boolean> => {
    return checkIfExistsByEmailAndNotId(idUser, email)
}

const isValidName = (name: string): boolean => {
    return name !== null && (
        /^[a-zA-ZÀ-ÿ\s]+$/.test(name) && 
        name.trim().length > 0
    );
};

const isValidBirthday = (birthday: Date): boolean => {
    return birthday !== null && (
        new Date(birthday) <= new Date()
    );
};

const isValidEmail = (email: string): boolean => {
    return email !== null && (
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
        !email.startsWith(".") &&
        !email.endsWith(".") &&
        !email.includes("..")
    );
};

const isValidPassword = (password: string): boolean => {
    return password !== null && (
        password.length >= 10 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
};

export { createUser };