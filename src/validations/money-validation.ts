import z, { ZodType } from "zod";

export class MoneyValidation {

    // =========================
    // CREATE Money Validation
    // =========================
    static readonly CREATE: ZodType = z.object({
        title: z
            .string({ error: "Title must be a string!" })
            .min(1, { error: "Title cannot be empty!" }),

        description: z
            .string({ error: "Description must be a string!" })
            .min(1, { error: "Description cannot be empty!" }),

        amount: z
            .number({ error: "Amount must be a number!" })
            .int({ error: "Amount must be an integer!" }),

        type: z
            .enum(["Income", "Outcome"], { error: "Type must be either 'Income' or 'Outcome'!" }),

        user_id: z
            .number({ error: "User ID must be a number!" })
            .int({ error: "User ID must be an integer!" }),

        category_id: z
            .number({ error: "Category ID must be a number!" })
            .int({ error: "Category ID must be an integer!" })
            .optional(),
    });

    // =========================
    // UPDATE Money Validation
    // (Semua optional)
    // =========================
    static readonly UPDATE: ZodType = z.object({
        title: z
            .string({ error: "Title must be a string!" })
            .min(1, { error: "Title cannot be empty!" })
            .optional(),

        description: z
            .string({ error: "Description must be a string!" })
            .min(1, { error: "Description cannot be empty!" })
            .optional(),

        amount: z
            .number({ error: "Amount must be a number!" })
            .int({ error: "Amount must be an integer!" })
            .optional(),

        type: z
            .enum(["Income", "Outcome"], { error: "Type must be either 'Income' or 'Outcome'!" })
            .optional(),

        category_id: z
            .number({ error: "Category ID must be a number!" })
            .int({ error: "Category ID must be an integer!" })
            .optional(),
    }).refine((data) => data.title || data.description || typeof data.amount !== "undefined" || data.type || typeof data.category_id !== "undefined", {
        message: "At least one field must be updated!",
    });
}
