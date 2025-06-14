import db from "../application/database.js";

export default class DeveloperRepository {

    static async find_data_by_email(email) {
        return await db.developer.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                hash_password: true,
            }
        });
    }

    static async register(name, email, hash_password) {
        return await db.developer.create({
            data: {
                name: name,
                email: email,
                hash_password: hash_password
            },
            select: {
                id: true,
                name: true,
                email: true,
                hash_password: true,
                created_at: true
            }
        });
    }

    static async find_application_exists(developer_id, name) {
        return await db.application.findFirst({
            where: {
                developer_id: developer_id,
                name: name
            }
        });
    }

    static async create_application(developer_id, name, client_id, client_secret) {
        return await db.application.create({
            data: {
                developer_id: developer_id,
                name: name,
                client_id: client_id,
                client_secret: client_secret
            }, select: {
                id: true,
                name: true,
                client_id: true,
                client_secret: true,
                created_at: true
            }
        });
    }

}