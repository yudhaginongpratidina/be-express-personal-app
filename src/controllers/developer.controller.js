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

    static async create_application(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            if (!token) return res.status(401).json({ message: "user not logged in" });

            const decoded = await decodeToken(token);

            const data = Validation.validate(DeveloperValidation.CREATE_APPLICATION, req.body);
            const response = await DeveloperService.create_application(decoded.id, data);
            res.status(201).json({ message: "Create Application Successfully", data: response });
        } catch (e) {
            next(e)
        }
    }

}