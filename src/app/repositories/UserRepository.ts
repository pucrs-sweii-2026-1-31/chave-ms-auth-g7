import Users from "../entities/Users.js";
import IUsers from "../interfaces/iUsers.js";
import { AppDataSource } from "../../database/database-config.js";
import { Not } from "typeorm";

const userRepository = AppDataSource.getRepository(Users);

const getUserByEmail = async (email: string): Promise<IUsers | null> => {
    const user = await userRepository.findOne({ where: { email } });
    return user ? (user as IUsers) : null;
};

const checkIfExistsByEmailAndNotId = async (idUser: number | null, email: string): Promise<boolean> => {
    const where: any = { email };
    if (idUser !== null) {
        where.idUser = Not(idUser);
    }
    const user = await userRepository.findOne({ where: where });
    return user ? true : false;
};

const save = async (user: Users): Promise<Users> => {
    return userRepository.save(user);
};

export { 
    getUserByEmail, 
    checkIfExistsByEmailAndNotId, 
    save 
}