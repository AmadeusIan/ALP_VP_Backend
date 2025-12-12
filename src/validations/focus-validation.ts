import z, { ZodType } from "zod";

export class FocusValidation {

    // =========================
    // CREATE Focus Validation
    // =========================
    static readonly CREATE: ZodType = z.object({
        startTime: z
            .string({
                error: "Start time must be a valid datetime string!",
            })
            .datetime({
                message: "Start time must be in ISO datetime format!",
            }),

        endTime: z
            .string({
                error: "End time must be a valid datetime string!",
            })
            .datetime({
                message: "End time must be in ISO datetime format!",
            }),

        user_id: z
            .number({
                error: "User ID must be a number!",
            })
            .int({
                error: "User ID must be an integer!",
            }),
    });

    // =========================
    // UPDATE Focus Validation
    // (Semua optional)
    // =========================
    static readonly UPDATE: ZodType = z.object({
        startTime: z
            .string({
                error: "Start time must be a valid datetime string!",
            })
            .datetime({
                message: "Start time must be in ISO datetime format!",
            })
            .optional(),

        endTime: z
            .string({
                error: "End time must be a valid datetime string!",
            })
            .datetime({
                message: "End time must be in ISO datetime format!",
            })
            .optional(),
    });
}
