import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"

import { MoneyController } from "../controllers/money-controller";

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/", MoneyController.getAll);
privateRouter.get("/:id", MoneyController.getOne);
privateRouter.post("/", MoneyController.create);
privateRouter.patch("/:id", MoneyController.update);
privateRouter.delete("/:id", MoneyController.delete);

