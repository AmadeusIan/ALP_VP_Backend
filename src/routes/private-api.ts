import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { ActivityController } from "../controllers/activiti-controller"
import { MoneyController } from "../controllers/money-controller"
import { FocusController } from "../controllers/focus-controller"

import { FocusPhaseController } from "../controllers/focusphase-controller"
import { CategoryController } from "../controllers/category-controller"
import { UserController } from "../controllers/user-controller"

import summaryController from "../controllers/summary-controller";
import taskController from "../controllers/task-controller";
import activityController from "../controllers/activity-controller";


export const privateRouter = express.Router()

privateRouter.get("/user", UserController.getAllUser);
privateRouter.use(authMiddleware)

privateRouter.get("/allAct", ActivityController.getAll)
privateRouter.get("/activity/:activityId", ActivityController.get)
privateRouter.post("/activity", ActivityController.create)
privateRouter.patch("/activity/:activityId", ActivityController.update)
privateRouter.delete("/activity/:activityId", ActivityController.delete)

privateRouter.get("/money", MoneyController.getAll);
privateRouter.get("/money/:id", MoneyController.getOne);
privateRouter.get("/money/user/:user_id", MoneyController.getByUserId);
privateRouter.post("/money/", MoneyController.create);
privateRouter.patch("/money/:id", MoneyController.update);
privateRouter.delete("/money/:id", MoneyController.delete);
privateRouter.get("/money/filter", MoneyController.filterByDate);

privateRouter.get("/category", CategoryController.getAll);
privateRouter.get("/category/:id", CategoryController.getOne);
privateRouter.get("/category/user/:user_id", CategoryController.getByUserId);
privateRouter.post("/category", CategoryController.create);
privateRouter.patch("/category/:id", CategoryController.update);
privateRouter.delete("/category/:id", CategoryController.delete);
privateRouter.get("/category/filter", CategoryController.filterByUserMonthCategory);


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

privateRouter.get('/summary', summaryController.getSummary); 
privateRouter.get('/all', summaryController.getAllItems); 

privateRouter.get('/tasks', taskController.getAllTasks); 
privateRouter.post('/tasks', taskController.createTask);
privateRouter.put('/tasks/:id', taskController.updateTask);
privateRouter.delete('/tasks/:id', taskController.deleteTask);

// --- Activity CRUD Routes ---
privateRouter.get('/activities', activityController.getAllActivities); 
privateRouter.post('/activities', activityController.createActivity);
privateRouter.put('/activities/:id', activityController.updateActivity);
privateRouter.delete('/activities/:id', activityController.deleteActivity);




