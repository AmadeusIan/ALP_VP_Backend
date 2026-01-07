import { Focus } from "../../generated/prisma/client";

// Request untuk membuat Focus record
export interface CreateFocusRequest {
    startTime: string; // ISO datetime string
    endTime: string;   // ISO datetime string
    user_id: number;
}

// Request untuk update Focus record
export interface UpdateFocusRequest {
    startTime?: string; // Optional, ISO string
    endTime?: string;   // Optional
}

// Response Focus record
export interface FocusResponse {
    id: number;
    startTime: Date;
    endTime: Date;
    user_id: number;
    createdAt: Date;
}

// Konversi Prisma result → FocusResponse
export function toFocusResponse(focus: Focus): FocusResponse {
    return {
        id: focus.id,
        startTime: focus.startTime,
        endTime: focus.endTime,
        user_id: focus.user_id,
        createdAt: focus.createdAt,
    };
}
