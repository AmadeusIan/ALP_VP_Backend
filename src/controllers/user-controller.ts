import { Request, Response, NextFunction } from "express"
import {
    LoginUserRequest,
    RegisterUserRequest,
    UserResponse,
} from "../models/user-model"
import { UserService } from "../services/user-service"

export class UserController {
    static async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUser();
            res.status(200).json({ data: users });
        } catch (error) {
            next(error);
        }
    }
    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.getUserById(id);
            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            

            res.status(200).json({
                data: response, 
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response: UserResponse = await UserService.login(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}

