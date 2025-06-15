import bcrypt from "bcrypt";

import { generateToken } from "../utils/jwt.js";
import ResponseError from "../utils/response-error.js";
import UserRepository from "../repositories/user.repository.js";

export default class UserService {

    static async register(data) {
        const user_exists = await UserRepository.find_data_by_email(data.email);
        if (user_exists) throw new ResponseError(409, "Email already exists");

        const hash_password = await bcrypt.hash(data.password, 12);
        return await UserRepository.register(data.name, data.email, hash_password);
    }

    static async login(data) {
        const find_user = await UserRepository.find_data_by_email(data.email);
        if (!find_user) throw new ResponseError(404, "User not found");

        if (find_user.status === "inactive") throw new ResponseError(403, "Your account is currently inactive. Please activate your account to proceed.");
        if (!await bcrypt.compare(data.password, find_user.hash_password)) throw new ResponseError(401, "Wrong password");

        const generate_token = await generateToken(find_user.id, find_user.name, find_user.email);
        return generate_token.access_token;
    }

    static async get_data_by_id(id) {
        return await UserRepository.find_data_by_id(id);
    }

    static async update_data_by_id(id, data) {
        const find_user = await UserRepository.find_data_by_id(id);
        if (!find_user) throw new ResponseError(404, "User not found");

        if (find_user.email !== data.email) {
            const email_exists = await UserRepository.find_data_by_email(data.email);
            if (email_exists) throw new ResponseError(409, "Email already exists");
        }

        return await UserRepository.update_data_by_id(id, data);
    }

    static async deactivated(id) {
        const find_user = await UserRepository.find_data_by_id(id);
        if (!find_user) throw new ResponseError(404, "User not found");
        return await UserRepository.deactivated_account(id);
    }
}