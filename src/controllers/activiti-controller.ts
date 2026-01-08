import { Request, Response, NextFunction } from "express";
import { ActivityCreateUpdateRequest } from "../models/activiti-model";
import { ActivityService } from "../services/activiti-service";

export class ActivityController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.user.id
            const request: ActivityCreateUpdateRequest = req.body as ActivityCreateUpdateRequest
            const response = await ActivityService.createActivity(userId,request)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const activityId = Number(req.params.activityId)
            const response = await ActivityService.getActivity(activityId)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await ActivityService.getAllActivities()
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: ActivityCreateUpdateRequest = req.body as ActivityCreateUpdateRequest;
            const activityId = Number(req.params.activityId)

            const response = await ActivityService.updateActivity(activityId, request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const activityId = Number(req.params.activityId)
            const response = await ActivityService.deleteActivity(activityId)

            res.status(200).json({
                data: response 
            })
        } catch (error) {
            next(error)
        }
    }
}