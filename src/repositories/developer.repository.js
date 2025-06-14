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

}