import z, { ZodType } from "zod"

export class ActivityValidation {
    static readonly CREATE_UPDATE: ZodType = z.object({
        title: z
            .string({
                error: "Title must be string!",
            })
            .min(1, {
                error: "Title can not be empty!",
            }),
        description: z
            .string({
                error: "Description must be string!",
            })
            .min(1, {
                error: "Description can not be empty!",
            }),
        start_date: z
            .string({
                error: "Start date must be string!",
            })
            .datetime({
                offset: true,
                message: "Start date must be valid ISO 8601 datetime!",
            }),
        end_date: z
            .string({
                error: "End date must be string!",
            })
            .datetime({
                offset: true,
                message: "End date must be valid ISO 8601 datetime!",
            }),
        start_time: z
            .string({
                error: "Start time must be string!",
            })
            .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
                message: "Start time must be in HH:mm format!",
            }),
        end_time: z
            .string({
                error: "End time must be string!",
            })
            .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
                message: "End time must be in HH:mm format!",
            }),
    })
}