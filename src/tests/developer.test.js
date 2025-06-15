import { before_test, after_test } from "./before-after";
import request from "supertest";
import 'dotenv/config';
import e from "express";

const url = `http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`;

describe("Developer Test", () => {

    beforeAll(async () => { await before_test(); });
    afterAll(async () => { await after_test(); });

    let token;
    let application_id;

    it("POST /developer/register - return 400 - password not match", async () => {
        const response = await request(url)
            .post('/developer/register')
            .send({
                name: 'user',
                email: 'user@developer.com',
                password: 'wrong_password',
                confirm_password: 'user@developer.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.data[0].message).toBe("Passwords do not match");
    })

    it("POST /developer/register - return 201 - register success", async () => {
        const response = await request(url)
            .post('/developer/register')
            .send({
                name: 'user',
                email: 'user@developer.com',
                password: 'user@developer.com',
                confirm_password: 'user@developer.com'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Register Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe("user");
        expect(response.body.data.email).toBe("user@developer.com");
        expect(response.body.data.hash_password).toBeDefined();
    })

    it("POST /developer/register - return 409 - email already exists", async () => {
        const response = await request(url)
            .post('/developer/register')
            .send({
                name: 'user',
                email: 'user@developer.com',
                password: 'user@developer.com',
                confirm_password: 'user@developer.com'
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Email already exists");
    })

    it("POST /developer/login - return 200 - login success", async () => {
        const response = await request(url)
            .post('/developer/login')
            .send({
                email: 'user@developer.com',
                password: 'user@developer.com'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login Successfully");
        expect(response.body.data).toBeDefined();

        token = response.body.data;
    })

    it("POST /developer/applications - return 201 - create application (client_id, client_secret)", async () => {
        const response = await request(url)
            .post('/developer/applications')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'app test',
                base_url: 'http://localhost:3000'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Create Application Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe("app test");
        expect(response.body.data.client_id).toBeDefined();
        expect(response.body.data.client_secret).toBeDefined();

        application_id = response.body.data.id;
    })

    it("GET /developer/applications - return 200 - get applications", async () => {
        const response = await request(url)
            .get('/developer/applications')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get Applications Successfully");
        expect(response.body.data).toBeDefined();
    })

    it("POST /developer/applications - return 409 - create application (client_id, client_secret)", async () => {
        const response = await request(url)
            .post('/developer/applications')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'app test',
                base_url: 'http://localhost:3000'
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Application already exists");
    });

    it("PATCH /developer/applications/:application_id - return 200 - update application success", async () => {
        const response = await request(url)
            .patch(`/developer/applications/${application_id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'app update',
                base_url: 'http://localhost:3000'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Update Application Successfully");

        expect(response.body.data.id).toBe(application_id);
        expect(response.body.data.name).toBe("app update");
        expect(response.body.data.base_url).toBe("http://localhost:3000");
    });

    it("DELETE /developer/applications/:application_id - return 200 - delete application success", async () => {
        const response = await request(url)
            .delete(`/developer/applications/${application_id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Delete Application Successfully");
    });

})