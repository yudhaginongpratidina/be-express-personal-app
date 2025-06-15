import { decodeToken } from "../utils/jwt.js";
import Validation from "../utils/validation.js";
import PortfolioValidation from "../validations/portfolio.validation.js";
import PortfolioService from "../services/portfolio.service.js";

export default class PortfolioController {

    static async get_all_portfolio_by_user_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const response = await PortfolioService.get_all_portfolio_by_user_id(decoded.id);
            res.status(200).json({ message: "Get All Portfolio Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async get_portfolio_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const response = await PortfolioService.get_portfolio_by_id(id);
            res.status(200).json({ message: "Get Portfolio Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async create_portfolio(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const data = Validation.validate(PortfolioValidation.CREATE, req.body);
            const response = await PortfolioService.create_portfolio(decoded.id, data);
            res.status(201).json({ message: "Create Portfolio Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async update_portfolio_by_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const id = req.params.id;
            const data = Validation.validate(PortfolioValidation.UPDATE, req.body);

            const response = await PortfolioService.update_portfolio_by_id(decoded.id, id, data);
            res.status(200).json({ message: "Update Portfolio Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async delete_portfolio_by_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);
            const id = req.params.id;

            await PortfolioService.delete_portfolio_by_id(decoded.id, id);
            res.status(200).json({ message: "Delete Portfolio Successfully" });
        } catch (e) {
            next(e);
        }
    }

}