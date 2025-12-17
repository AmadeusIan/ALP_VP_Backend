// src/routes/app-routes.ts (FINAL DENGAN GET ALL INDIVIDU)
import { Router } from 'express';
import taskController from '../controllers/task-controller';
import activityController from '../controllers/activity-controller';
import summaryController from '../controllers/summary-controller'; 

const router = Router();


router.get('/summary', summaryController.getSummary); 
router.get('/all', summaryController.getAllItems); 

router.get('/tasks', taskController.getAllTasks); 
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

// --- Activity CRUD Routes ---
router.get('/activities', activityController.getAllActivities); 
router.post('/activities', activityController.createActivity);
router.put('/activities/:id', activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

export default router;