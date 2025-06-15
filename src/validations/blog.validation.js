import { z } from "zod";

export default class BlogValidation {
    
    static CREATE = z.object({
        title : z
            .string()
            .min(3, { message: "Title must be at least 3 characters long" })
            .max(50, { message: "Title must be at most 50 characters long" })
            .nonempty({ message: "Title is required" }),
        content : z
            .string()
            .min(3, { message: "Content must be at least 3 characters long" })
            .nonempty({ message: "Content is required" })
    })

    static UPDATE = z.object({
        title : z
            .string()
            .min(3, { message: "Title must be at least 3 characters long" })
            .max(50, { message: "Title must be at most 50 characters long" })
            .nonempty({ message: "Title is required" }),
        content : z
            .string()
            .min(3, { message: "Content must be at least 3 characters long" })
            .nonempty({ message: "Content is required" }),
        status : z.enum(["published", "draft"], { required_error: "Status is required" })
    })

}