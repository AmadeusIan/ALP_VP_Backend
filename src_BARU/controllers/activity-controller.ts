// src/controllers/activity-controller.ts
import { Request, Response } from 'express';
import activityService from '../services/activity-service';
import { createActivitySchema, updateActivitySchema } from '../models/activity-model';
import { Prisma } from '@prisma/client';

const activityController = {
    async createActivity(req: Request, res: Response) {
        try {
            const validatedData = createActivitySchema.parse(req.body);
            const newActivity = await activityService.createActivity(validatedData);
            
            res.status(201).json({ 
                ...newActivity, 
                type: 'Activity',
                startDateTime: newActivity.startDateTime ? newActivity.startDateTime.toISOString() : null,
                endDateTime: newActivity.endDateTime ? newActivity.endDateTime.toISOString() : null
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            res.status(500).json({ error: 'Gagal membuat Activity.' });
        }
    },

    async updateActivity(req: Request, res: Response) {
        try {
            const validatedData = updateActivitySchema.parse(req.body);
            const updatedActivity = await activityService.updateActivity(req.params.id, validatedData);
            
            res.json({ 
                ...updatedActivity, 
                type: 'Activity', 
                startDateTime: updatedActivity.startDateTime ? updatedActivity.startDateTime.toISOString() : null,
                endDateTime: updatedActivity.endDateTime ? updatedActivity.endDateTime.toISOString() : null
            });
        } catch (error: any) {
             if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Activity tidak ditemukan.' });
            }
            if (error.name === 'ZodError') {
                 return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            res.status(500).json({ error: 'Gagal memperbarui Activity.' });
        }
    },
    
    async deleteActivity(req: Request, res: Response) {
        try {
            await activityService.deleteActivity(req.params.id);
            res.status(204).send(); 
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Activity tidak ditemukan.' });
            }
            res.status(500).json({ error: 'Gagal menghapus Activity.' });
        }
    },

    async getAllActivities(req: Request, res: Response) {
        try {
            const activities = await activityService.getAllActivities();
            
            
            const formattedActivities = activities.map(a => ({
                ...a,
                type: 'Activity',
                startDateTime: a.startDateTime ? a.startDateTime.toISOString() : null,
                endDateTime: a.endDateTime ? a.endDateTime.toISOString() : null,
            }));
            
            res.json(formattedActivities);
        } catch (error) {
            console.error("Gagal mengambil semua Activities:", error);
            res.status(500).json({ error: 'Gagal mengambil semua Activities.' });
        }
    }

};

export default activityController;