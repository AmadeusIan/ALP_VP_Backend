import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"

import { CustomerController } from "../controllers/customer-controller"
import { RestaurantController } from "../controllers/restaurant-controller"
import { OrderController } from "../controllers/order-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

