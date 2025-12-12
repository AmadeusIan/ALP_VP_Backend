import z, { ZodType } from "zod";

export class RestaurantValidation {
  
  static readonly CREATE: ZodType = z.object({
    name: z
      .string({
        error: "Name must be a string!",
      })
      .min(1, {
        error: "Name cannot be empty!",
      }),
      
    description: z
      .string({
        error: "Description must be a string!",
      })
      .min(1, {
        error: "Description cannot be empty!",
      }),

    isOpen: z
      .boolean({
        error: "isOpen must be a boolean!",
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


  static readonly UPDATE_DESCRIPTION: ZodType = z.object({
    description: z
      .string({
        error: "Description must be a string!",
      })
      .min(1, {
        error: "Description cannot be empty!",
      }),
  });


  static readonly UPDATE_STATUS: ZodType = z.object({
    isOpen: z
      .boolean({
        error: "isOpen must be a boolean!",
      }),
  });
}
