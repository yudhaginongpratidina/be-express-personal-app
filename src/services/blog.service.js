import ResponseError from "../utils/response-error.js";
import BlogRepository from "../repositories/blog.repository.js";

export default class BlogService {

    static async get_blogs() {
        const result = await BlogRepository.get_blogs();
        return result;
    }

    static async get_blogs_by_author_id(author_id) {
        const result = await BlogRepository.get_blog_by_author_id(author_id);
        return result;
    }

    static async get_blog_by_slug(slug) {
        const result = await BlogRepository.get_blog_by_slug(slug);
        if (!result) throw new ResponseError(404, "Blog not found");
        return result;
    }

    static async get_blog_by_id(user_id, id) {
        const result = await BlogRepository.get_blog_by_id(id);
        if (!result) throw new ResponseError(404, "Blog not found");
        if (result.user_id !== user_id) throw new ResponseError(401, "You are not the owner of this blog");
        return result;
    }

    static async create_blog(user_id, data) {
        const data_exists = await BlogRepository.get_blog_by_title(data.title);
        if (data_exists) throw new ResponseError(409, "Blog already exists");
        const slug = data.title.replace(/\s+/g, '-').toLowerCase();
        const blog = {
            user_id: user_id,
            title: data.title,
            slug: slug,
            content: data.content,
        }

        const result = await BlogRepository.create_blog(user_id, blog);
        return result;
    }

    static async update_blog_by_id(user_id, id, data) {
        const data_exists = await BlogRepository.get_blog_by_id(id);
        if (!data_exists) throw new ResponseError(404, "Blog not found");
        if (data_exists.user_id !== user_id) throw new ResponseError(401, "You are not the owner of this blog");

        const slug = data.title.replace(/\s+/g, '-').toLowerCase();
        const blog = {
            title: data.title,
            slug: slug,
            content: data.content,
            status: data.status
        }

        const result = await BlogRepository.update_blog_by_id(id, blog);
        return result;
    }

    static async delete_blog_by_id(user_id, id) {
        const data_exists = await BlogRepository.get_blog_by_id(id);
        if (!data_exists) throw new ResponseError(404, "Blog not found");
        if (data_exists.user_id !== user_id) throw new ResponseError(401, "You are not the owner of this blog");
        const result = await BlogRepository.delete_blog_by_id(id);
        return result;
    }

}