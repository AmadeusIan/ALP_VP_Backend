<<<<<<< HEAD
import { ZodType } from "zod"
=======
import { ZodType } from "zod";
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e

export class Validation {
    static validate<T>(schema: ZodType, data: T): T {
        return schema.parse(data) as T
    }
}