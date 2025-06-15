import db from "../application/database.js";

const before_test = async () => {
    await db.application.deleteMany();
    await db.developer.deleteMany();
    await db.user.deleteMany();
};

const after_test = async () => {
    await db.application.deleteMany();
    await db.developer.deleteMany();
    await db.user.deleteMany();
    await db.$disconnect();
};

export { before_test, after_test };