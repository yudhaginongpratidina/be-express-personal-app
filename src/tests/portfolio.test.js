import { before_test, after_test } from "./before-after";
import request from "supertest";
import 'dotenv/config';

const url = `http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`;

describe("Portfolio Test", () => {
    beforeAll(async () => { await before_test(); });
    afterAll(async () => { await after_test(); });

    let token;
    let portfolio_id;

    it("POST /user/login - return 200 - login success", async () => {
        const response = await request(url)
            .post('/user/login')
            .send({
                email: 'user@test.com',
                password: 'user@test.com'
            });

        token = response.body.data;
    })

    it("POST /user/portfolio - create portfolio - return 201", async () => {
        const response = await request(url)
            .post('/user/portfolio')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'portfolio',
                description: 'portfolio description'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Create Portfolio Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.title).toBe("portfolio");
        expect(response.body.data.description).toBe("portfolio description");

        portfolio_id = response.body.data.id;
    })

    it("GET /user/portfolio - get all portfolio - return 200", async () => {
        const response = await request(url)
            .get('/user/portfolio')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get All Portfolio Successfully");
        expect(response.body.data).toBeDefined();
    });

    it("GET /user/portfolio/:id - get portfolio by id - return 200", async () => {
        const response = await request(url)
            .get(`/user/portfolio/${portfolio_id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get Portfolio Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.title).toBe("portfolio");
        expect(response.body.data.description).toBe("portfolio description");
    });

    it("PATCH /user/portfolio/:id - update portfolio by id - return 200", async () => {
        const response = await request(url)
            .patch(`/user/portfolio/${portfolio_id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'portfolio update',
                description: 'portfolio description update'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Update Portfolio Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.title).toBe("portfolio update");
        expect(response.body.data.description).toBe("portfolio description update");
    });

    it("DELETE /user/portfolio/:id - delete portfolio by id - return 200", async () => {
        const response = await request(url)
            .delete(`/user/portfolio/${portfolio_id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Delete Portfolio Successfully");
    });

});