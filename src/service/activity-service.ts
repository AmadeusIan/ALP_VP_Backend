
import { Activity } from "../../generated/prisma/client"
import { ResponseError } from "../error/response-error"
import { ActivityResponse, ActivityCreateUpdateRequest, toActivityResponse, toActivityResponseArray } from "../models/activity-model"
import { prismaClient } from "../utils/database-util"
import { ActivityValidation } from "../validations/activity_validation"
import { Validation } from "../validations/validation"

export class ActivityService {

    static async getActivity(activityId: number): Promise<ActivityResponse> {
        const activity = await prismaClient.activity.findUnique({
            where: { id: activityId }
        })
        if (!activity) {
            throw new ResponseError(404, "Activity not found!")
        }
        return toActivityResponse(activity)
    }

    static async getAllActivities(): Promise<ActivityResponse[]> {
        const activities = await prismaClient.activity.findMany()
        return activities.map((activity: Activity) => toActivityResponse(activity))
    }

    static async createActivity(user_id: number, reqData: ActivityCreateUpdateRequest): Promise<string> {
        const validatedData = Validation.validate(
            ActivityValidation.CREATE_UPDATE,
            reqData
        )

        await prismaClient.activity.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                start_date: validatedData.start_date,
                end_date: validatedData.end_date,
                start_time: validatedData.start_time,
                end_time: validatedData.end_time,
                user_id: user_id,
            },
        })

        return "Activity created!"
    }

    static async updateActivity(activityId: number, req: ActivityCreateUpdateRequest): Promise<string> {
        const validatedData = Validation.validate(
            ActivityValidation.CREATE_UPDATE,
            req
        )

        const activity = await prismaClient.activity.findUnique({
            where: { id: activityId }
        })
        if (!activity) {
            throw new ResponseError(404, "Activity not found!")
        }

        await prismaClient.activity.update({
            where: { id: activityId },
            data: {
                title: validatedData.title,
                description: validatedData.description,
                start_date: validatedData.start_date,
                end_date: validatedData.end_date,
                start_time: validatedData.start_time,
                end_time: validatedData.end_time,
            },
        })

        return "Activity updated!"
    }

    static async deleteActivity(activityId: number): Promise<string> {
        const activity = await prismaClient.activity.findUnique({
            where: { id: activityId }
        })
        if (!activity) {
            throw new ResponseError(404, "Activity not found!")
        }

        await prismaClient.activity.delete({
            where: { id: activityId }
        })

        return "Activity deleted!"
    }
}