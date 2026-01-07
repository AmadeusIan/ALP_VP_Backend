import express from "express"
import { authMiddleware } from "../middleware/auth-middlewares"
import { ActivityController } from "../controller/activity-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/allAct", ActivityController.getAll)
privateRouter.get("/activity/:activityId", ActivityController.get)
privateRouter.post("/activity", ActivityController.create)
privateRouter.patch("/activity/:activityId", ActivityController.update)
privateRouter.delete("/activity/:activityId", ActivityController.delete)