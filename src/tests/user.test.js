import { before_test, after_test } from "./before-after";
import request from "supertest";
import 'dotenv/config';

const url = `http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`;

describe("User Test", () => {

    beforeAll(async () => { await before_test(); });
    afterAll(async () => { await after_test(); });

    let token;

    it("POST /user/register - return 400 - password not match", async () => {
        const response = await request(url)
            .post('/user/register')
            .send({
                name: 'user',
                email: 'user@developer.com',
                password: 'wrong_password',
                confirm_password: 'user@developer.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.data[0].message).toBe("Passwords do not match");
    })

    it("POST /user/register - return 201 - register success", async () => {
        const response = await request(url)
            .post('/user/register')
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

    it("POST /user/register - return 409 - email already exists", async () => {
        const response = await request(url)
            .post('/user/register')
            .send({
                name: 'user',
                email: 'user@developer.com',
                password: 'user@developer.com',
                confirm_password: 'user@developer.com'
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Email already exists");
    })

    it("POST /user/login - return 200 - login success", async () => {
        const response = await request(url)
            .post('/user/login')
            .send({
                email: 'user@developer.com',
                password: 'user@developer.com'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login Successfully");
        expect(response.body.data).toBeDefined();

        token = response.body.data;
    })

    it("/GET /user/profile - return 200 - get my profile", async () => {
        const response = await request(url)
            .get('/user/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get Profile Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe("user");
        expect(response.body.data.email).toBe("user@developer.com");
    })

    it("PATCH /user/profile - return 200 - update profile", async () => {
        const response = await request(url)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'user update',
                email: 'user@developer.com'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Update Profile Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe("user update");
        expect(response.body.data.email).toBe("user@developer.com");
    })

    it("DELETE /user/deactivate - return 200 - deactivate account", async () => {
        const response = await request(url)
            .delete('/user/deactivated')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Deactivated Successfully");
    })

    it("POST /user/login - return 401 - login fail", async () => {
        const response = await request(url)
            .post('/user/login')
            .send({
                email: 'user@developer.com',
                password: 'user@developer.com'
            });

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Your account is currently inactive. Please activate your account to proceed.");
    })


})