import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"

import { MoneyController } from "../controllers/money-controller";
import { FocusController } from "../controllers/focus-controller";
import { FocusPhaseController } from "../controllers/focusphase-controller";  


export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/money", MoneyController.getAll);
privateRouter.get("/money/:id", MoneyController.getOne);
privateRouter.post("/money", MoneyController.create);
privateRouter.patch("/money/:id", MoneyController.update);
privateRouter.delete("/money/:id", MoneyController.delete);


privateRouter.get("/focus", FocusController.getAll);
privateRouter.get("/focus/:id", FocusController.getOne);
privateRouter.post("/focus/", FocusController.create);
privateRouter.patch("/focus/:id", FocusController.update);
privateRouter.delete("/focus/:id", FocusController.delete);

privateRouter.get("/focusphase", FocusPhaseController.getAll);
privateRouter.get("/focusphase/:id", FocusPhaseController.getOne);
privateRouter.post("/focusphase/", FocusPhaseController.create);
privateRouter.patch("/focusphase/:id", FocusPhaseController.update);
privateRouter.delete("/focusphase/:id", FocusPhaseController.delete);


