import z, { ZodType } from "zod";

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        customerId: z
            .number({
                error: "Customer ID must be a number!"
            })
            .min(1, {
                error: "Customer ID cannot be empty!"
            }),

        restaurantId: z
            .number({
                error: "Restaurant ID must be a number!"
            })
            .min(1, {
                error: "Restaurant ID cannot be empty!"
            }),

        items: z
            .number({
                error: "Items must be a number!"
            })
            .min(1, {
                error: "Items must be at least 1!"
            }),
    });
}
