import { ResponseError } from "../error/response-error";
import {
    CreateFocusRequest,
    UpdateFocusRequest,
    FocusResponse,
    toFocusResponse
} from "../models/focus-model";
import { prismaClient } from "../utils/database-util";
import { FocusValidation } from "../validations/focus-validation";
import { Validation } from "../validations/validation";

export class FocusService {

    // =========================
    // GET ALL Focus
    // =========================
    static async getAll(): Promise<FocusResponse[]> {
        const focuses = await prismaClient.focus.findMany();

        return focuses.map((focus) => toFocusResponse(focus));
    }

    // =========================
    // GET Focus by ID
    // =========================
    static async getById(id: number): Promise<FocusResponse> {
        const focus = await prismaClient.focus.findUnique({
            where: { id },
        });

        if (!focus) {
            throw new ResponseError(404, "Focus record not found");
        }

        return toFocusResponse(focus);
    }

    // =========================
    // CREATE Focus record
    // =========================
    static async create(request: CreateFocusRequest): Promise<FocusResponse> {
        const createRequest = Validation.validate(FocusValidation.CREATE, request);

        const newFocus = await prismaClient.focus.create({
            data: {
                startTime: new Date(createRequest.startTime),
                endTime: new Date(createRequest.endTime),
                user_id: createRequest.user_id,
            },
        });

        return toFocusResponse(newFocus);
    }

    // =========================
    // UPDATE Focus record
    // =========================
    static async update(id: number, reqData: UpdateFocusRequest): Promise<FocusResponse> {
        // Minimal harus ada satu field yang diupdate
        if (!reqData.startTime && !reqData.endTime) {
            throw new ResponseError(400, "At least one field must be updated");
        }

        const updateRequest = Validation.validate(FocusValidation.UPDATE, reqData);

        const updated = await prismaClient.focus.update({
            where: { id },
            data: {
                ...(updateRequest.startTime && { startTime: new Date(updateRequest.startTime) }),
                ...(updateRequest.endTime && { endTime: new Date(updateRequest.endTime) }),
            },
        });

        return toFocusResponse(updated);
    }

    // =========================
    // DELETE Focus record
    // =========================
    static async delete(id: number): Promise<FocusResponse> {
        await this.getById(id); // ensure exists

        const deleted = await prismaClient.focus.delete({
            where: { id },
        });

        return toFocusResponse(deleted);
    }
}
