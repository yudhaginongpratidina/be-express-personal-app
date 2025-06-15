import db from "../application/database.js";

export default class BlogRepository {

    static async get_blogs() {
        return await db.blog.findMany({
            where: {
                status: "published"
            },
            include: {
                user: true
            }
        });
    }

    static async get_blog_by_slug(slug) {
        return await db.blog.findUnique({
            where: {
                slug: slug
            }
        });
    }

    static async get_blog_by_id(id) {
        return await db.blog.findUnique({
            where: {
                id: id
            }
        });
    }

    static async get_blog_by_title(title) {
        return await db.blog.findUnique({
            where: {
                title: title
            }
        });
    }

    static async get_blog_by_author_id(author_id) {
        return await db.blog.findMany({
            where: {
                user_id: author_id
            }
        });
    }

    static async create_blog(user_id, data) {
        return await db.blog.create({
            data: {
                user_id: user_id,
                title: data.title,
                slug: data.slug,
                content: data.content
            }
        });
    }

    static async update_blog_by_id(id, data) {
        return await db.blog.update({
            where: {
                id: id
            },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status
            }
        });
    }

    static async delete_blog_by_id(id) {
        return await db.blog.delete({
            where: {
                id: id
            }
        });
    }

}