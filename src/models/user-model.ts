import { generateToken } from "../utils/jwt-util"

// Payload yang disimpan di JWT
export interface UserJWTPayload {
    id: number
    username: string
    email: string
    goal_id: number
}

// Request untuk register
export interface RegisterUserRequest {
    username: string
    email: string
    password: string
    goal_id: number
}

// Request untuk login
export interface LoginUserRequest {
    email: string
    password: string
}

// Response saat login atau register
export interface UserResponse {
    token?: string
    id?: number
    username?: string
    email?: string
    goal_id?: number
    createdAt?: Date
    updatedAt?: Date
}

// Konversi user Prisma ke response + JWT
export function toUserResponse(
    id: number,
    username: string,
    email: string,
    goal_id: number
): UserResponse {
    return {
        token: generateToken(
            {
                id,
                username,
                email,
                goal_id,
            },
            "1h"
        ),
        id,
        username,
        email,
        goal_id,
    }
}