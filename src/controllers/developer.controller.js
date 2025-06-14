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

}