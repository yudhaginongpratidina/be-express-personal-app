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

    static async find_application_exists_by_id(application_id) {
        return await db.application.findUnique({
            where: {
                id: application_id
            }
        })
    }

    static async get_applications(developer_id) {
        return await db.application.findMany({
            where: {
                developer_id: developer_id
            }
        });
    }

    static async create_application(developer_id, name, client_id, client_secret, base_url) {
        return await db.application.create({
            data: {
                developer_id: developer_id,
                name: name,
                client_id: client_id,
                client_secret: client_secret,
                base_url: base_url
            }, select: {
                id: true,
                name: true,
                client_id: true,
                client_secret: true,
                base_url: true,
                created_at: true
            }
        });
    }

    static async update_application(application_id, name, base_url) {
        return await db.application.update({
            where: {
                id: application_id
            },
            data: {
                name: name,
                base_url: base_url,
                updated_at: new Date()
            },
            select: {
                id: true,
                name: true,
                base_url: true,
                updated_at: true
            }
        });
    }

    static async validae_application_owner(developer_id, application_id) {
        return await db.application.findFirst({
            where: {
                developer_id: developer_id,
                id: application_id
            }
        });
    }

    static async delete_application(id) {
        return await db.application.delete({
            where: {
                id: id
            }
        });
    }

}