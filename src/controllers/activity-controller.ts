// src/controllers/activity-controller.ts
import { Request, Response } from 'express';
import activityService from '../services/activity-service';
import { createActivitySchema, updateActivitySchema } from '../models/activity-model';
import { Prisma } from '@prisma/client';    

// Interface bantuan biar TypeScript tau req.user itu ada
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    }
}

const activityController = {
    async createActivity(req: Request, res: Response) {
        try {
            // 1. Ambil User ID dari Token (yang dipasang middleware auth)
            const userId = (req as AuthRequest).user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: User tidak ditemukan.' });
            }

            const validatedData = createActivitySchema.parse(req.body);
            
            // 2. Kirim userId ke Service
            const newActivity = await activityService.createActivity(validatedData, userId);
            
            res.status(201).json({ 
                ...newActivity, 
                type: 'Activity',
                // Pastikan handle null/undefined untuk tanggal
                startDateTime: newActivity.startDateTime ? new Date(newActivity.startDateTime).toISOString() : null,
                endDateTime: newActivity.endDateTime ? new Date(newActivity.endDateTime).toISOString() : null
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            console.error(error); // Log error biar tau kenapa
            res.status(500).json({ error: 'Gagal membuat Activity.' });
        }
    },

    async updateActivity(req: Request, res: Response) {
        try {
            // Cek user ID untuk keamanan (opsional: pastikan user cuma bisa edit punya sendiri)
            const userId = (req as AuthRequest).user?.id;
             if (!userId) {
                return res.status(401).json({ error: 'Unauthorized.' });
            }

            const validatedData = updateActivitySchema.parse(req.body);
            
            // Konversi ID params string ke Int
            const activityId = parseInt(req.params.id);

            const updatedActivity = await activityService.updateActivity(activityId, validatedData);
            
            res.json({ 
                ...updatedActivity, 
                type: 'Activity', 
                startDateTime: updatedActivity.startDateTime ? new Date(updatedActivity.startDateTime).toISOString() : null,
                endDateTime: updatedActivity.endDateTime ? new Date(updatedActivity.endDateTime).toISOString() : null
            });
        } catch (error: any) {
             if (error && error.code === 'P2025') {
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
            const activityId = parseInt(req.params.id);
            await activityService.deleteActivity(activityId);
            res.status(204).send(); 
        } catch (error: any) {
            if (error && error.code === 'P2025') {
                return res.status(404).json({ error: 'Activity tidak ditemukan.' });
            }
            res.status(500).json({ error: 'Gagal menghapus Activity.' });
        }
    },

    async getAllActivities(req: Request, res: Response) {
        try {
            // 3. Ambil aktivitas HANYA milik user yang login
            const userId = (req as AuthRequest).user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized.' });
            }

            // Kirim userId ke service
            const activities = await activityService.getAllActivities(userId);
            
            const formattedActivities = activities.map((a: typeof activities[number]) => ({
                ...a,
                type: 'Activity',
                startDateTime: a.startDateTime ? new Date(a.startDateTime).toISOString() : null,
                endDateTime: a.endDateTime ? new Date(a.endDateTime).toISOString() : null,
            }));
            
            res.json(formattedActivities);
        } catch (error) {
            console.error("Gagal mengambil semua Activities:", error);
            res.status(500).json({ error: 'Gagal mengambil semua Activities.' });
        }
    }

};

export default activityController;
