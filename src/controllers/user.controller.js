import { decodeToken } from "../utils/jwt.js";
import Validation from "../utils/validation.js";
import UserValidation from "../validations/user.validation.js";
import UserService from "../services/user.service.js";

export default class UserController {

    static async register(req, res, next) {
        try {
            const data = Validation.validate(UserValidation.REGISTER, req.body);
            const response = await UserService.register(data);
            res.status(201).json({ message: "Register Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        try {
            const data = Validation.validate(UserValidation.LOGIN, req.body);
            const response = await UserService.login(data);
            res.status(200).json({ message: "Login Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async profile(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);
            const response = await UserService.get_data_by_id(decoded.id);
            res.status(200).json({ message: "Get Profile Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async update_data(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);
            const data = Validation.validate(UserValidation.UPDATE_DATA, req.body);
            const response = await UserService.update_data_by_id(decoded.id, data);
            res.status(200).json({ message: "Update Profile Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async deactivated(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);
            const response = await UserService.deactivated(decoded.id);
            res.status(200).json({ message: "Deactivated Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

}