import z, { ZodType } from "zod";

export class FocusPhaseValidation {

    // =========================
    // CREATE FocusPhase Validation
    // =========================
    static readonly CREATE: ZodType = z.object({
        focus_id: z
            .number({
                error: "Focus ID must be a number!",
            })
            .int({
                error: "Focus ID must be an integer!",
            }),

        type: z
            .enum(["Focus", "Break"], {
                error: "Type must be either 'Focus' or 'Break'!",
            }),

        duration: z
            .number({
                error: "Duration must be a number!",
            })
            .int({
                error: "Duration must be an integer!",
            })
            .min(1, {
                error: "Duration must be greater than 0!",
            }),
    });

    // =========================
    // UPDATE FocusPhase Validation
    // =========================
    static readonly UPDATE: ZodType = z.object({
        type: z
            .enum(["Focus", "Break"], {
                error: "Type must be either 'Focus' or 'Break'!",
            })
            .optional(),

        duration: z
            .number({
                error: "Duration must be a number!",
            })
            .int({
                error: "Duration must be an integer!",
            })
            .min(1, {
                error: "Duration must be greater than 0!",
            })
            .optional(),
    });
}
