import request from "supertest";
import 'dotenv/config';

const url = `http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`;

describe("Wellcome Test", () => {

    it("GET / - return 200", async () => {
        const response = await request(url).get('/');

        expect(response.status).toBe(200);
        expect(response.body.application).toBe("backend personal app");
        expect(response.body.version).toBe("1.0.0");
        
        expect(response.body.developer.name).toBe("yudha ginong pratidina");
        expect(response.body.developer.github).toBe("https://github.com/yudhaginongpratidina");
        expect(response.body.developer.linkedin).toBe("https://www.linkedin.com/in/yudha-ginong-pratidina/");
        expect(response.body.developer.role).toBe("Backend Developer");

        expect(response.body.techstack.runtime).toBe("nodejs");
        expect(response.body.techstack.framework).toBe("express");
        expect(response.body.techstack.database).toBe("mysql");
        expect(response.body.techstack.object_relational_mapping).toBe("prisma");
        expect(response.body.techstack.input_validation).toBe("zod");
        expect(response.body.techstack.testing).toBe("jest + supertest");
    });

});