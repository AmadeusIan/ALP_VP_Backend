import { ResponseError } from "../error/response-error";
import {
    CreateMoneyRequest,
    UpdateMoneyRequest,
    MoneyResponse,
    toMoneyResponse
} from "../models/money-model";
import { prismaClient } from "../utils/database-util";
import { MoneyValidation } from "../validations/money-validation";
import { Validation } from "../validations/validation";

export class MoneyService {
    // =========================
    // FILTER money by date range (day, week, month)
    // =========================
    static async filterByDate({ user_id, type, date }: { user_id: number, type: 'day' | 'week' | 'month', date: Date }): Promise<MoneyResponse[]> {
        let start: Date, end: Date;
        const d = new Date(date);
        if (type === 'day') {
            start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
        } else if (type === 'week') {
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Senin sebagai awal minggu
            start = new Date(d.setDate(diff));
            start.setHours(0,0,0,0);
            end = new Date(start);
            end.setDate(start.getDate() + 7);
        } else if (type === 'month') {
            start = new Date(d.getFullYear(), d.getMonth(), 1);
            end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        } else {
            throw new ResponseError(400, 'Invalid filter type');
        }
        const moneys = await prismaClient.money.findMany({
            where: {
                user_id,
                createdAt: {
                    gte: start,
                    lt: end,
                },
            },
        });
        return moneys.map(toMoneyResponse);
    }

    // =========================
    // Ambil semua money record
    // =========================
    static async getAll(): Promise<MoneyResponse[]> {
        const moneys = await prismaClient.money.findMany();

        return moneys.map((money) => toMoneyResponse(money));
    }

    // =========================
    // Ambil money by ID
    // =========================
    static async getById(id: number): Promise<MoneyResponse> {
        const money = await prismaClient.money.findUnique({
            where: { id }
        });

        if (!money) {
            throw new ResponseError(404, "Money record not found");
        }

        return toMoneyResponse(money);
    }

    // =========================
    // Ambil money by User ID
    // =========================
    static async getByUserId(user_id: number): Promise<MoneyResponse[]> {
        const moneys = await prismaClient.money.findMany({
            where: { user_id }
        });

        return moneys.map((money) => toMoneyResponse(money));
    }

    // =========================
    // CREATE money record
    // =========================
    static async create(request: CreateMoneyRequest): Promise<MoneyResponse> {
        const createRequest = Validation.validate(MoneyValidation.CREATE, request);

        const money = await prismaClient.money.create({
            data: {
                title: createRequest.title,
                description: createRequest.description,
                amount: createRequest.amount,
                type: createRequest.type,
                user_id: createRequest.user_id,
            },
        });

        return toMoneyResponse(money);
    }

    // =========================
    // UPDATE money record
    // =========================
    static async update(id: number, reqData: UpdateMoneyRequest): Promise<MoneyResponse> {
        // Minimal harus ada satu field yang diupdate
        if (
            !reqData.title &&
            !reqData.description &&
            typeof reqData.amount === "undefined" &&
            !reqData.type
        ) {
            throw new ResponseError(400, "At least one field must be updated");
        }

        const updateRequest = Validation.validate(MoneyValidation.UPDATE, reqData);

        const money = await prismaClient.money.update({
            where: { id },
            data: updateRequest,
        });

        return toMoneyResponse(money);
    }

    // =========================
    // DELETE money record
    // =========================
    static async delete(id: number): Promise<MoneyResponse> {
        await this.getById(id);

        const deleted = await prismaClient.money.delete({
            where: { id }
        });

        return toMoneyResponse(deleted);
    }
}
