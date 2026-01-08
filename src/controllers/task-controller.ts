import { Request, Response } from 'express';
import taskService from '../services/task-service';
import { createTaskSchema, updateTaskSchema } from '../models/task-model';
import { Prisma } from '@prisma/client';

// Interface untuk Request yang memiliki User (dari Middleware)
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    }
}

const taskController = {
    async createTask(req: Request, res: Response) {
        try {
            // 1. Ambil User ID
            const userId = (req as AuthRequest).user?.id;
            if (!userId) return res.status(401).json({ error: 'Unauthorized.' });

            const validatedData = createTaskSchema.parse(req.body);
            
            // 2. Kirim userId ke service
            const newTask = await taskService.createTask(validatedData, userId);
            
            res.status(201).json({ 
                ...newTask, 
                type: 'Task',
                // Map due_date DB ke dateTime Frontend
                dateTime: newTask.due_date ? newTask.due_date.toISOString() : null 
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            console.error(error);
            res.status(500).json({ error: 'Gagal membuat Task.' });
        }
    },

    async updateTask(req: Request, res: Response) {
        try {
            const userId = (req as AuthRequest).user?.id;
            if (!userId) return res.status(401).json({ error: 'Unauthorized.' });

            const validatedData = updateTaskSchema.parse(req.body);
            
            // 3. Parse ID params ke Number
            const taskId = parseInt(req.params.id);

            const updatedTask = await taskService.updateTask(taskId, validatedData);
            
            res.json({ 
                ...updatedTask, 
                type: 'Task', 
                dateTime: updatedTask.due_date ? updatedTask.due_date.toISOString() : null 
            });
        } catch (error: any) {
             if (error && error.code === 'P2025') {
                return res.status(404).json({ error: 'Task tidak ditemukan.' });
            }
            if (error.name === 'ZodError') {
                 return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            res.status(500).json({ error: 'Gagal memperbarui Task.' });
        }
    },
    
    async deleteTask(req: Request, res: Response) {
        try {
            // Parse ID params ke Number
            const taskId = parseInt(req.params.id);
            await taskService.deleteTask(taskId);
            res.status(204).send(); 
        } catch (error: any) {
            if (error && error.code === 'P2025') {
                return res.status(404).json({ error: 'Task tidak ditemukan.' });
            }
            res.status(500).json({ error: 'Gagal menghapus Task.' });
        }
    },

    async getAllTasks(req: Request, res: Response) {
        try {
            const userId = (req as AuthRequest).user?.id;
            if (!userId) return res.status(401).json({ error: 'Unauthorized.' });

            // 4. Ambil Task milik User ID ini saja
            const tasks = await taskService.getAllTasks(userId);
            
            const formattedTasks = tasks.map((t: typeof tasks[number]) => ({
                ...t,
                type: 'Task',
                // Map due_date DB ke dateTime Frontend
                dateTime: t.due_date ? t.due_date.toISOString() : null,
            }));
            
            res.json(formattedTasks);
        } catch (error) {
            console.error("Gagal mengambil semua Tasks:", error);
            res.status(500).json({ error: 'Gagal mengambil semua Tasks.' });
        }
    }
};

export default taskController;