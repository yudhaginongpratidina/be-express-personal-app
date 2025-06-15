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

    static async get_applications(developer_id) {
        return await DeveloperRepository.get_applications(developer_id);
    }

    static async create_application(developer_id, data) {
        const application_exists = await DeveloperRepository.find_application_exists(developer_id, data.name);
        if (application_exists) throw new ResponseError(409, "Application already exists");

        const generate_client_id = crypto.randomBytes(16).toString("hex");
        const generate_client_secret = crypto.randomBytes(32).toString("hex")

        const hash_client_id = await bcrypt.hash(generate_client_id, 12);
        const hash_client_secret = await bcrypt.hash(generate_client_secret, 12);

        return await DeveloperRepository.create_application(developer_id, data.name, hash_client_id, hash_client_secret, data.base_url);
    }

    static async update_application(application_id, data) {
        const application_exists = await DeveloperRepository.find_application_exists_by_id(application_id);
        if (!application_exists) throw new ResponseError(404, "Application not found");
        return await DeveloperRepository.update_application(application_id, data.name, data.base_url);
    }

    static async delete_application(developer_id, application_id){
        const validae_application_owner = await DeveloperRepository.validae_application_owner(developer_id, application_id);
        if (!validae_application_owner) throw new ResponseError(409, "Application not found");
        return await DeveloperRepository.delete_application(application_id);
    }

}