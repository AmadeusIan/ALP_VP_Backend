<<<<<<< HEAD
import { string } from "zod"
import { generateToken } from "../utils/jwt-util"

=======
import { generateToken } from "../utils/jwt-util"

// Payload yang disimpan di JWT
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
export interface UserJWTPayload {
    id: number
    username: string
    email: string
}

<<<<<<< HEAD
=======
// Request untuk register
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
export interface RegisterUserRequest {
    username: string
    email: string
    password: string
}

<<<<<<< HEAD
=======
// Request untuk login
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
export interface LoginUserRequest {
    email: string
    password: string
}

<<<<<<< HEAD
export interface UserResponse {
    token?: string
}

export function toUserResponse(
    id: number,
    username: string,
    email: string
=======
// Response saat login atau register
export interface UserResponse {
    token?: string
    id?: number
    username?: string
    email?: string
    createdAt?: Date
    updatedAt?: Date
}

// Konversi user Prisma ke response + JWT
export function toUserResponse(
    id: number,
    username: string,
    email: string,
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
): UserResponse {
    return {
        token: generateToken(
            {
<<<<<<< HEAD
                id: id,
                username: username,
                email: email,
            },
            "1h"
        ),
=======
                id,
                username,
                email,
            },
            "7d"
        ),
        id,
        username,
        email,
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
    }
}