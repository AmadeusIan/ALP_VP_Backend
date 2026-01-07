import { ResponseError } from "../error/response-error";
import {
    CreateFocusPhaseRequest,
    UpdateFocusPhaseRequest,
    FocusPhaseResponse,
    toFocusPhaseResponse
} from "../models/focusphase-model";
import { prismaClient } from "../utils/database-util";
import { FocusPhaseValidation } from "../validations/focusphase-validation";
import { Validation } from "../validations/validation";

export class FocusPhaseService {

    // =========================
    // GET ALL FocusPhase
    // =========================
    static async getAll(): Promise<FocusPhaseResponse[]> {
        const focusPhases = await prismaClient.focusPhase.findMany();

        return focusPhases.map((phase) => toFocusPhaseResponse(phase));
    }

    // =========================
    // GET FocusPhase by ID
    // =========================
    static async getById(id: number): Promise<FocusPhaseResponse> {
        const phase = await prismaClient.focusPhase.findUnique({
            where: { id },
        });

        if (!phase) {
            throw new ResponseError(404, "FocusPhase record not found");
        }

        return toFocusPhaseResponse(phase);
    }

    // ====================
    // GET FocusPhases by Focus ID
    // ====================
    static async getByFocusId(focus_id: number): Promise<FocusPhaseResponse[]> {
        const phases = await prismaClient.focusPhase.findMany({
            where: { focus_id },
        });
        return phases.map((phase) => toFocusPhaseResponse(phase));
    }


    // =========================
    // CREATE FocusPhase
    // =========================
    static async create(request: CreateFocusPhaseRequest): Promise<FocusPhaseResponse> {
        const createRequest = Validation.validate(FocusPhaseValidation.CREATE, request);

        const newPhase = await prismaClient.focusPhase.create({
            data: {
                focus_id: createRequest.focus_id,
                type: createRequest.type,
                duration: createRequest.duration,
            },
        });

        return toFocusPhaseResponse(newPhase);
    }

    // =========================
    // UPDATE FocusPhase
    // =========================
    static async update(id: number, reqData: UpdateFocusPhaseRequest): Promise<FocusPhaseResponse> {
        // Minimal 1 field required
        if (
            reqData.type === undefined &&
            reqData.duration === undefined
        ) {
            throw new ResponseError(400, "At least one field must be updated");
        }

        const updateRequest = Validation.validate(FocusPhaseValidation.UPDATE, reqData);

        const updated = await prismaClient.focusPhase.update({
            where: { id },
            data: {
                ...(updateRequest.type !== undefined && { type: updateRequest.type }),
                ...(updateRequest.duration !== undefined && { duration: updateRequest.duration }),
            },
        });

        return toFocusPhaseResponse(updated);
    }

    // =========================
    // DELETE FocusPhase
    // =========================
    static async delete(id: number): Promise<FocusPhaseResponse> {
        await this.getById(id); // ensures exists

        const deleted = await prismaClient.focusPhase.delete({
            where: { id },
        });

        return toFocusPhaseResponse(deleted);
    }
}
