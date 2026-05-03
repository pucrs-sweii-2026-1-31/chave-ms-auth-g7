import Users from "app/entities/Users.js";
import { AppDataSource } from "database/database-config.js";
const userRepository = AppDataSource.getRepository(Users);
const getUserByEmail = async (email) => {
    const user = await userRepository.findOne({ where: { email } });
    return user ? user : null;
};
export { getUserByEmail };
//# sourceMappingURL=UserRepository.js.map