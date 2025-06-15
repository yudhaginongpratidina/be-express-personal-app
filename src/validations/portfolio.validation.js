import { z } from "zod";

export default class PortfolioValidation {

    static CREATE = z.object({
        title : z
            .string()
            .min(3, { message: "Title must be at least 3 characters long" })
            .max(50, { message: "Title must be at most 50 characters long" })
            .nonempty({ message: "Title is required" }),
        description : z
            .string()
            .min(3, { message: "Description must be at least 3 characters long" })
            .max(50, { message: "Description must be at most 50 characters long" })
            .nonempty({ message: "Description is required" })
    });

    static UPDATE = z.object({
        title : z
            .string()
            .min(3, { message: "Title must be at least 3 characters long" })
            .max(50, { message: "Title must be at most 50 characters long" })
            .nonempty({ message: "Title is required" }),
        description : z
            .string()
            .min(3, { message: "Description must be at least 3 characters long" })
            .max(50, { message: "Description must be at most 50 characters long" })
            .nonempty({ message: "Description is required" })
    });

}