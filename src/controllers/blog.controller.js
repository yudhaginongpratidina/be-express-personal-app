import { decodeToken } from "../utils/jwt.js";
import Validation from "../utils/validation.js";
import BlogValidation from "../validations/blog.validation.js";
import BlogService from "../services/blog.service.js";

export default class BlogController {

    static async get_blogs(req, res, next) {
        try {
            const response = await BlogService.get_blogs();
            res.status(200).json({ message: "Get Blogs Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async get_blog_by_slug(req, res, next) {
        try {
            const response = await BlogService.get_blog_by_slug(req.params.slug);
            res.status(200).json({ message: "Get Blog Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async get_blogs_by_author_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            if (!token) { return res.status(401).json({ message: "Unauthorized" }); }
            const decoded = await decodeToken(token);

            const response = await BlogService.get_blogs_by_author_id(decoded.id);
            res.status(200).json({ message: "Get My Blogs Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async get_blog_by_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const response = await BlogService.get_blog_by_id(decoded.id, req.params.id);
            res.status(200).json({ message: "Get Blog Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async create_blog(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const data = Validation.validate(BlogValidation.CREATE, req.body);
            const response = await BlogService.create_blog(decoded.id, data);
            res.status(201).json({ message: "Create Blog Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async update_blog_by_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            const data = Validation.validate(BlogValidation.UPDATE, req.body);
            const response = await BlogService.update_blog_by_id(decoded.id, req.params.id, data);
            res.status(200).json({ message: "Update Blog Successfully", data: response });
        } catch (e) {
            next(e);
        }
    }

    static async delete_blog_by_id(req, res, next) {
        try {
            const auth_header = req.headers['authorization'];
            const token = auth_header && auth_header.split(' ')[1];
            const decoded = await decodeToken(token);

            await BlogService.delete_blog_by_id(decoded.id, req.params.id);
            res.status(200).json({ message: "Delete Blog Successfully" });
        } catch (e) {
            next(e);
        }
    }

}