import { z } from "zod";

export default class DeveloperValidation {

    static REGISTER = z.object({
        name: z
            .string()
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(50, { message: "Name must be at most 50 characters long" }),
        email: z
            .string()
            .email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(50, { message: "Password must be at most 50 characters long" }),
        confirm_password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(50, { message: "Password must be at most 50 characters long" }),
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
            ctx.addIssue({ path: ["confirm_password"], message: "Passwords do not match" });
        }
    });

    static LOGIN = z.object({
        email: z
            .string()
            .email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(50, { message: "Password must be at most 50 characters long" }),
    });

    static CREATE_APPLICATION = z.object({
        name: z
            .string()
            .min(1, { message: "Application must be at least 1 characters long" })
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(250, { message: "Name must be at most 250 characters long" }),
        base_url: z
            .string()
            .min(1, { message: "Base URL must be at least 1 characters long" })
            .min(3, { message: "Base URL must be at least 3 characters long" })
            .max(150, { message: "Base URL must be at most 150 characters long" }),
    });

    static UPDATE_APPLICATION = z.object({
        name: z
            .string()
            .min(1, { message: "Application must be at least 1 characters long" })
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(250, { message: "Name must be at most 250 characters long" }),
        base_url: z
            .string()
            .min(1, { message: "Base URL must be at least 1 characters long" })
            .min(3, { message: "Base URL must be at least 3 characters long" })
            .max(150, { message: "Base URL must be at most 150 characters long" }),
    });
}