import { decodeToken } from "../utils/jwt.js";
import Validation from "../utils/validation.js";
import DeveloperValidation from "../validations/developer.validation.js";
import DeveloperService from "../services/developer.service.js";

export default class DeveloperController {

    static async register(req, res, next) {
        try {
            const data = Validation.validate(DeveloperValidation.REGISTER, req.body);
            const response = await DeveloperService.register(data);
            res.status(201).json({ message: "Register Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        try {
            const data = Validation.validate(DeveloperValidation.LOGIN, req.body);
            const response = await DeveloperService.login(data);
            res.status(200).json({ message: "Login Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async get_applications(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const response = await DeveloperService.get_applications(decoded.id);
            res.status(200).json({ message: "Get Applications Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async create_application(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const data = Validation.validate(DeveloperValidation.CREATE_APPLICATION, req.body);
            const response = await DeveloperService.create_application(decoded.id, data);
            res.status(201).json({ message: "Create Application Successfully", data: response });
        } catch (e) {
            next(e)
        }
    }

    static async update_application(req, res, next) {
        try {
            const application_id = req.params.application_id;
            const data = Validation.validate(DeveloperValidation.UPDATE_APPLICATION, req.body);
            const response = await DeveloperService.update_application(application_id, data);
            res.status(200).json({ message: "Update Application Successfully", data: response });
        } catch (e) {
            next(e)
        }
    }

    static async delete_application(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const application_id = req.params.application_id;
            const developer_id = decoded.id;

            await DeveloperService.delete_application(developer_id, application_id);
            res.status(200).json({ message: "Delete Application Successfully"});
        } catch (e) {
            next(e)
        }
    }

}