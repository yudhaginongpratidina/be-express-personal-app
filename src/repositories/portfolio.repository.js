import db from "../application/database.js";

export default class PortfolioRepository {

    static async get_all_portfolio_by_user_id(user_id) {
        return await db.portfolio.findMany({
            where: {
                user_id: user_id
            }
        });
    }

    static async get_portfolio_by_id(id) {
        return await db.portfolio.findUnique({
            where: {
                id: id
            }
        });
    }

    static async get_portfolio_by_user_id_and_title(user_id, title) {
        return await db.portfolio.findFirst({
            where: {
                user_id: user_id,
                title: title
            }
        });
    }

    static async create_portfolio(user_id, data){
        return await db.portfolio.create({
            data: {
                user_id: user_id,
                title: data.title,
                description: data.description
            }
        })
    }

    static async update_portfolio_by_id(id, data){
        return await db.portfolio.update({
            where: {
                id: id
            },
            data: {
                title: data.title,
                description: data.description
            }
        })
    }

    static async delete_portfolio_by_id(id){
        return await db.portfolio.delete({
            where: {
                id: id
            }
        })
    }

}