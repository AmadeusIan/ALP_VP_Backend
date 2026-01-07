import { FocusPhase } from "../../generated/prisma/client";

// Request untuk membuat FocusPhase
export interface CreateFocusPhaseRequest {
    focus_id: number;
    type: "Focus" | "Break";
    duration: number;
}

// Request untuk update FocusPhase (semua optional)
export interface UpdateFocusPhaseRequest {
    type?: "Focus" | "Break";
    duration?: number;
}

// Response FocusPhase ke client
export interface FocusPhaseResponse {
    id: number;
    focus_id: number;
    type: string;
    duration: number;
}

// Convert Prisma → Response
export function toFocusPhaseResponse(record: FocusPhase): FocusPhaseResponse {
    return {
        id: record.id,
        focus_id: record.focus_id,
        type: record.type,
        duration: record.duration,
    };
}

// Convert list Prisma → list Response
export function toFocusPhaseResponseList(records: FocusPhase[]): FocusPhaseResponse[] {
    return records.map((item) => toFocusPhaseResponse(item));
}
