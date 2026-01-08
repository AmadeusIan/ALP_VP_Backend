import z, { ZodType } from "zod";

export class CategoryValidation {

    // =========================
    // CREATE Category Validation
    // =========================
    static readonly CREATE: ZodType = z.object({
        user_id: z
            .number({ error: "User ID must be a number!" })
            .int({ error: "User ID must be an integer!" }),

        budget: z
            .number({ error: "Budget must be a number!" })
            .int({ error: "Budget must be an integer!" }),

        name: z
            .string({ error: "Name must be a string!" })
            .min(1, { error: "Name cannot be empty!" }),
    });

    // =========================
    // UPDATE Category Validation
    // (Semua optional)
    // =========================
    static readonly UPDATE: ZodType = z.object({
        budget: z
            .number({ error: "Budget must be a number!" })
            .int({ error: "Budget must be an integer!" })
            .optional(),

        name: z
            .string({ error: "Name must be a string!" })
            .min(1, { error: "Name cannot be empty!" })
            .optional(),
    }).refine((data) => data.budget !== undefined || data.name !== undefined, {
        message: "At least one field must be updated!",
    });
}
