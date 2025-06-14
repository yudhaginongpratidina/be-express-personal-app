export default class WellcomeController {

    static index(req, res, next) {
        try {
            res.status(200).json({
                application: "backend personal app",
                version: "1.0.0",
                developer: {
                    name : "yudha ginong pratidina",
                    github: "https://github.com/yudhaginongpratidina",
                    linkedin: "https://www.linkedin.com/in/yudha-ginong-pratidina/",
                    role: "Backend Developer"
                },
                techstack : {
                    runtime : "nodejs",
                    framework : "express",
                    database : "mysql",
                    object_relational_mapping : "prisma",
                    input_validation : "zod",
                    testing : "jest + supertest"
                }
            });
        } catch (e) {
            next(e);
        }
    }

}