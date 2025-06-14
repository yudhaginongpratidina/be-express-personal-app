import bcrypt from "bcrypt";
import crypto from "crypto";

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

    static async create_application(developer_id, data) {
        const application_exists = await DeveloperRepository.find_application_exists(developer_id, data.name);
        if (application_exists) throw new ResponseError(409, "Application already exists");

        const generate_client_id = crypto.randomBytes(16).toString("hex");
        const generate_client_secret = crypto.randomBytes(32).toString("hex")

        const hash_client_id = await bcrypt.hash(generate_client_id, 12);
        const hash_client_secret = await bcrypt.hash(generate_client_secret, 12);

        return await DeveloperRepository.create_application(developer_id, data.name, hash_client_id, hash_client_secret);
    }

}