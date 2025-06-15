import { before_test, after_test } from "./before-after";
import request from "supertest";
import 'dotenv/config';

const url = `http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`;

describe("Blog Test", () => {

    beforeAll(async () => { await before_test(); });
    afterAll(async () => { await after_test(); });

    let token;
    let blog_slug;
    let blog_id;

    it("POST /user/login - return 200 - login success", async () => {
        const response = await request(url)
            .post('/user/login')
            .send({
                email: 'user@test.com',
                password: 'user@test.com'
            });

        token = response.body.data;
    })

    it("POST /blogs - create blog - return 201", async () => {
        const response = await request(url)
            .post('/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'blog one',
                content: 'blog content',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Create Blog Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.title).toBe("blog one");
        expect(response.body.data.slug).toBe("blog-one");
        expect(response.body.data.content).toBe("blog content");

        blog_id = response.body.data.id;
    })

    it("GET /blogs/:id/edit - get blog by id (edit - only author) - return 200", async () => {
        const response = await request(url)
            .get(`/blogs/${blog_id}/edit`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get Blog Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.slug).toBe("blog-one");
        expect(response.body.data.title).toBe("blog one");
        expect(response.body.data.content).toBe("blog content");
    });

    it("PATCH /blogs/:id/update - update blog by id - return 200", async () => {
        const response = await request(url)
            .patch(`/blogs/${blog_id}/update`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'blog update',
                content: 'blog content update',
                status: "published"
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Update Blog Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.title).toBe("blog update");
        expect(response.body.data.slug).toBe("blog-update");
        expect(response.body.data.content).toBe("blog content update");
        expect(response.body.data.status).toBe("published");

        blog_slug = response.body.data.slug;
    });

    it("GET /blogs - get all blog - return 200", async () => {
        const response = await request(url)
            .get('/blogs')
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get Blogs Successfully");
        expect(response.body.data).toBeDefined();
    })

    it("GET /blogs/:slug - get blog by slug - return 200", async () => {
        const response = await request(url)
            .get(`/blogs/${blog_slug}`)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get Blog Successfully");
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.slug).toBe("blog-update");
        expect(response.body.data.title).toBe("blog update");
        expect(response.body.data.content).toBe("blog content update");
    })

    it("GET /blogs/my-blogs - get my blog - return 200", async () => {
        const response = await request(url)
            .get('/blogs/my-blogs')
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Get My Blogs Successfully");
        expect(response.body.data).toBeDefined();

        blog_id = response.body.data[0].id;
    })

    it("DELETE /blogs/:id/delete - delete blog by id - return 200", async () => {
        const response = await request(url)
            .delete(`/blogs/${blog_id}/delete`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Delete Blog Successfully");
    })
});