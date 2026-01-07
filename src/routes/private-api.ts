import express from "express"
<<<<<<< HEAD
import { authMiddleware } from "../middleware/auth-middlewares"
import { ActivityController } from "../controller/activity-controller"
=======
import { authMiddleware } from "../middlewares/auth-middleware"

import { MoneyController } from "../controllers/money-controller";
import { FocusController } from "../controllers/focus-controller";
import { FocusPhaseController } from "../controllers/focusphase-controller";  

>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

<<<<<<< HEAD
privateRouter.get("/allAct", ActivityController.getAll)
privateRouter.get("/activity/:activityId", ActivityController.get)
privateRouter.post("/activity", ActivityController.create)
privateRouter.patch("/activity/:activityId", ActivityController.update)
privateRouter.delete("/activity/:activityId", ActivityController.delete)
=======
privateRouter.get("/money", MoneyController.getAll);
privateRouter.get("/money/:id", MoneyController.getOne);
privateRouter.post("/money/", MoneyController.create);
privateRouter.patch("/money/:id", MoneyController.update);
privateRouter.delete("/money/:id", MoneyController.delete);


privateRouter.get("/focus", FocusController.getAll);
privateRouter.get("/focus/:id", FocusController.getOne);
privateRouter.post("/focus", FocusController.create);
privateRouter.patch("/focus/:id", FocusController.update);
privateRouter.delete("/focus/:id", FocusController.delete);

privateRouter.get("/focusphase", FocusPhaseController.getAll);
privateRouter.get("/focusphase/:id", FocusPhaseController.getOne);
privateRouter.get("/focusphase/focus/:focus_id", FocusPhaseController.getByFocusId);
privateRouter.post("/focusphase", FocusPhaseController.create);
privateRouter.patch("/focusphase/:id", FocusPhaseController.update);
privateRouter.delete("/focusphase/:id", FocusPhaseController.delete);


>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
