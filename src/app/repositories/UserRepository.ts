import Users from "app/entities/Users.js";
import IUsers from "app/interfaces/iUsers.js";
import { AppDataSource } from "database/database-config.js";

const userRepository = AppDataSource.getRepository(Users);

const getUserByEmail = async (email: string): Promise<IUsers | null> => {
    const user = await userRepository.findOne({ where: { email } });
    return user ? (user as IUsers) : null;
};

export { getUserByEmail }