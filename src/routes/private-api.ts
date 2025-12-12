import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"

import { MoneyController } from "../controllers/money-controller";
import { FocusController } from "../controllers/focus-controller";
import { FocusPhaseController } from "../controllers/focusphase-controller";  


export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/", MoneyController.getAll);
privateRouter.get("/:id", MoneyController.getOne);
privateRouter.post("/", MoneyController.create);
privateRouter.patch("/:id", MoneyController.update);
privateRouter.delete("/:id", MoneyController.delete);


privateRouter.get("/", FocusController.getAll);
privateRouter.get("/:id", FocusController.getOne);
privateRouter.post("/", FocusController.create);
privateRouter.patch("/:id", FocusController.update);
privateRouter.delete("/:id", FocusController.delete);

privateRouter.get("/", FocusPhaseController.getAll);
privateRouter.get("/:id", FocusPhaseController.getOne);
privateRouter.post("/", FocusPhaseController.create);
privateRouter.patch("/:id", FocusPhaseController.update);
privateRouter.delete("/:id", FocusPhaseController.delete);


