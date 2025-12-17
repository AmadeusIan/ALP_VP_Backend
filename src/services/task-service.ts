// src/services/task-service.ts
import prisma from '../lib/prisma';
import { CreateTaskDTO, UpdateTaskDTO } from '../models/task-model'; 

class TaskService {
    async createTask(data: CreateTaskDTO) {
        // Konversi string dateTime dari Kotlin menjadi objek Date untuk Prisma
        const taskData = {
            title: data.title,
            description: data.description,
            dateTime: data.dateTime ? new Date(data.dateTime) : undefined, 
            difficulty: data.difficulty, 
            isCompleted: false,
        };
        return prisma.task.create({ data: taskData });
    }

    async updateTask(id: string, data: UpdateTaskDTO) {
        const dataForUpdate = {
            ...data,
            dateTime: data.dateTime ? new Date(data.dateTime) : undefined,
        };
        return prisma.task.update({ where: { id }, data: dataForUpdate as any });
    }
    
    async deleteTask(id: string) {
        return prisma.task.delete({ where: { id } });
    }

    async getAllTasks() {
        return prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    }

}

export default new TaskService();