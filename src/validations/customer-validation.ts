import z, { ZodType } from "zod";

export class CustomerValidation {

    static readonly CREATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be a string!",
            })
            .min(1, {
                error: "Name cannot be empty!",
            }),
        phone: z
            .string({
                error: "Phone must be a string!",
            })
            .min(1, {
                error: "Phone cannot be empty!",
            }),
    });

    static readonly UPDATE_NAME: ZodType = z.object({
        name: z
            .string({
                error: "Name must be a string!",
            })
            .min(1, {
                error: "Name cannot be empty!",
            }),
    });

    static readonly UPDATE_PHONE: ZodType = z.object({
        phone: z
            .string({
                error: "Phone must be a string!",
            })
            .min(1, {
                error: "Phone cannot be empty!",
            }),
    });
}
