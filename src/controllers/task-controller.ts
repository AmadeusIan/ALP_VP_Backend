// src/controllers/task-controller.ts
import { Request, Response } from 'express';
import taskService from '../services/task-service';
import { createTaskSchema, updateTaskSchema } from '../models/task-model';
import { Prisma } from '@prisma/client';

const taskController = {
    async createTask(req: Request, res: Response) {
        
        try {
            const validatedData = createTaskSchema.parse(req.body);
            const newTask = await taskService.createTask(validatedData);
            
            res.status(201).json({ 
                ...newTask, 
                type: 'Task',
                dateTime: newTask.dateTime ? newTask.dateTime.toISOString() : null 
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            res.status(500).json({ error: 'Gagal membuat Task.' });
        }
    },

    async updateTask(req: Request, res: Response) {
       
        try {
            const validatedData = updateTaskSchema.parse(req.body);
            const updatedTask = await taskService.updateTask(req.params.id, validatedData);
            res.json({ 
                ...updatedTask, 
                type: 'Task', 
                dateTime: updatedTask.dateTime ? updatedTask.dateTime.toISOString() : null 
            });
        } catch (error: any) {
             if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Task tidak ditemukan.' });
            }
            if (error.name === 'ZodError') {
                 return res.status(400).json({ message: "Validasi data gagal.", errors: error.errors });
            }
            res.status(500).json({ error: 'Gagal memperbarui Task.' });
        }
    },
    
    async deleteTask(req: Request, res: Response) {
        
        const { id } = req.params;

        const taskId = id.trim();
    
        try {
            await taskService.deleteTask(req.params.id);
            res.status(204).send(); 
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Task tidak ditemukan.' });
            }
            res.status(500).json({ error: 'Gagal menghapus Task.' });
        }
    },
    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await taskService.getAllTasks();
            
            
            const formattedTasks = tasks.map(t => ({
                ...t,
                type: 'Task',
                dateTime: t.dateTime ? t.dateTime.toISOString() : null,
            }));
            
            res.json(formattedTasks);
        } catch (error) {
            console.error("Gagal mengambil semua Tasks:", error);
            res.status(500).json({ error: 'Gagal mengambil semua Tasks.' });
        }
    }
};

export default taskController;