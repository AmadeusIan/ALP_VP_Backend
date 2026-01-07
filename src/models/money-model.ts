import { Money } from "../../generated/prisma/client";

// Request untuk membuat money record
export interface CreateMoneyRequest {
    title: string
    description: string
    amount: number
    type: "Income" | "Outcome"
    user_id: number
}

// Request untuk update money record
export interface UpdateMoneyRequest {
    title?: string
    description?: string
    amount?: number
    type?: "Income" | "Outcome"
}

// Response money record
export interface MoneyResponse {
    id: number
    title: string
    description: string
    amount: number
    type: string
    user_id: number
    createdAt: Date
}

// Konversi Prisma result → MoneyResponse
export function toMoneyResponse(money: Money): MoneyResponse {
    return {
        id: money.id,
        title: money.title,
        description: money.description,
        amount: money.amount,
        type: money.type,
        user_id: money.user_id,
        createdAt: money.createdAt,
    }
}
