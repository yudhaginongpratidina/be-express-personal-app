import db from "../application/database.js";

export default class UserRepository {
    
    static async find_data_by_email(email) {
        return await db.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                hash_password: true,
                status: true
            }
        });
    }

    static async find_data_by_id(id) {
        return await db.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true
            }
        });
    }


    static async register(name, email, hash_password) {
        return await db.user.create({
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

    static async update_data_by_id(id,data){
        return await db.user.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                email: data.email,
                avatar: data.avatar,
                updated_at: new Date()
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                updated_at: true
            }
        });
    }


    static async deactivated_account(id) {
        return await db.user.update({
            where: {
                id: id
            },
            data: {
                status: "inactive"
            }
        })
    }

}