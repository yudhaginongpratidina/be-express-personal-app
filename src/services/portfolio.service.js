import ResponseError from "../utils/response-error.js";
import PortfolioRepository from "../repositories/portfolio.repository.js";

export default class PortfolioService {

    static async get_all_portfolio_by_user_id(user_id){
        const result = await PortfolioRepository.get_all_portfolio_by_user_id(user_id);
        return result;
    }

    static async get_portfolio_by_id(id){
        const result = await PortfolioRepository.get_portfolio_by_id(id);
        if (!result) throw new ResponseError(404, "Portfolio not found");
        return result;
    }

    static async create_portfolio(user_id, data){
        const data_exists = await PortfolioRepository.get_portfolio_by_user_id_and_title(user_id, data.title);
        if (data_exists) throw new ResponseError(409, "Portfolio already exists");
        const result = await PortfolioRepository.create_portfolio(user_id, data);
        return result;
    }

    static async update_portfolio_by_id(user_id, id, data){
        const data_exists = await PortfolioRepository.get_portfolio_by_id(id);
        if (!data_exists) throw new ResponseError(404, "Portfolio not found");

        if(data_exists.user_id !== user_id) throw new ResponseError(401, "You are not the owner of this portfolio");
        const result = await PortfolioRepository.update_portfolio_by_id(id, data);
        return result;
    }

    static async delete_portfolio_by_id(user_id, id){
        const data_exists = await PortfolioRepository.get_portfolio_by_id(id);
        if (!data_exists) throw new ResponseError(404, "Portfolio not found");

        if(data_exists.user_id !== user_id) throw new ResponseError(401, "You are not the owner of this portfolio");
        const result = await PortfolioRepository.delete_portfolio_by_id(id);
        return result;
    }

}