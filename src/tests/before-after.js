import db from "../application/database.js";

const before_test = async () => {
    await db.developer.deleteMany();
};

const after_test = async () => {
    await db.developer.deleteMany();
    await db.$disconnect();
};

export { before_test, after_test };