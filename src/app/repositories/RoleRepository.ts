import Roles from "../entities/Roles.js";
import IRoles from "../interfaces/iRoles.js";
import { AppDataSource } from "../../database/database-config.js";
import { Not } from "typeorm";

const roleRepository = AppDataSource.getRepository(Roles);

const getRoleByName = async (name: string): Promise<IRoles | null> => {
    const role = await roleRepository.findOne({ where: { name } });
    return role ? (role as IRoles) : null;
};

export { 
    getRoleByName
}