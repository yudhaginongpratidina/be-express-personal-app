import db from "../application/database.js";
import bcrypt from "bcrypt";

const before_test = async () => {
    await db.blog.deleteMany();
    await db.portfolio.deleteMany();
    await db.application.deleteMany();
    await db.developer.deleteMany();
    await db.user.deleteMany();
    await db.user.create({
        data: {
            name: "user@test.com",
            email: "user@test.com",
            hash_password: await bcrypt.hash("user@test.com", 10)
        }
    })
};

const after_test = async () => {
    await db.blog.deleteMany();
    await db.portfolio.deleteMany();
    await db.application.deleteMany();
    await db.developer.deleteMany();
    await db.user.deleteMany();
    await db.$disconnect();
};

export { before_test, after_test };