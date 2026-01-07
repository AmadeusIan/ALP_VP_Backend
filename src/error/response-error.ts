export class ResponseError extends Error {
<<<<<<< HEAD
    constructor(public status: number, public message: string) {
=======
    constructor(public status: number, message: string) {
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
        super(message)
    }
}