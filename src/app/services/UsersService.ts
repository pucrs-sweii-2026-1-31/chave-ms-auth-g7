import Users from '../entities/Users.js';
import Roles from '../entities/Roles.js';
import { Gender } from '../interfaces/iUsers.js';
import { checkIfExistsByEmailAndNotId, save } from '../repositories/UserRepository.js';
import { getRoleByName } from '../repositories/RoleRepository.js';

const createUser = async (payload: {
    name: string,
    birthday: Date,
    gender: Gender,
    email: string
}): Promise<Users> => {
    let user = payload as Users;
    console.log(user);
    console.log(await validateClearEmail(null, user.email));
    if (await validateClearEmail(null, user.email)) {
        throw new Error("Email já em uso");
    }
    // Defininando valores base
    let basicRole = await getRoleByName("geral") as Roles;
    if (basicRole === null) {
        throw new Error("Falha ao localizar função geral no sistema");
    } 
    user.roles = [basicRole];
    user.active = true;

    return saveUser(user);
}

const validateClearEmail = async (idUser: number | null, email: string): Promise<boolean> => {
    return checkIfExistsByEmailAndNotId(idUser, email)
}

const saveUser = async (user: Users): Promise<Users> => {
    return save(user);
}

export { createUser };