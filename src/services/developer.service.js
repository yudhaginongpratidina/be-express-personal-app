import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateToken } from "../utils/jwt.js";
import ResponseError from "../utils/response-error.js";
import DeveloperRepository from "../repositories/developer.repository.js";

export default class DeveloperService {

    static async register(data) {
        const developer_exists = await DeveloperRepository.find_data_by_email(data.email);
        if (developer_exists) throw new ResponseError(409, "Email already exists");

        const hash_password = await bcrypt.hash(data.password, 12);
        return await DeveloperRepository.register(data.name, data.email, hash_password);
    }

    static async login(data) {
        const developer = await DeveloperRepository.find_data_by_email(data.email);
        if (!developer) throw new ResponseError(401, "Invalid credentials");
        
        const is_password_valid = await bcrypt.compare(data.password, developer.hash_password);
        if (!is_password_valid) throw new ResponseError(401, "Invalid credentials");
        
        const generate_token = await generateToken(developer.id, developer.name, developer.email);
        return generate_token.access_token;
    }    

}