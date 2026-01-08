import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO, UpdateTaskDTO } from '../models/task-model'; 

const prisma = new PrismaClient();

const taskService = {
    // 1. CREATE
    async createTask(data: CreateTaskDTO, userId: number) {
        return await prisma.task.create({
            data: {
                title: data.title,
                description: data.description ?? "",
                due_date: new Date(data.dateTime), 
                difficulty: data.difficulty,
                priority: "Medium", 
                status: "ToDo", 
                user: {
                    connect: { id: userId }
                }
            }
        });
    },

    // 2. UPDATE
    async updateTask(id: number, data: UpdateTaskDTO) {
        return await prisma.task.update({
            where: { id: id },
            data: {
                title: data.title,
                description: data.description ? data.description : undefined,
                due_date: data.dateTime ? new Date(data.dateTime) : undefined,
                status: data.isCompleted !== undefined ? (data.isCompleted ? "Done" : "ToDo") : undefined,
            }
        });
    },
    
    // 3. DELETE
    async deleteActivity(id: number) { // Note: Typo di code aslimu "deleteActivity", tapi isinya task. Gapapa.
        return await prisma.task.delete({
            where: { id: id }
        });
    },
    async deleteTask(id: number) { // Tambahan biar aman kalau controller panggil deleteTask
        return await prisma.task.delete({
            where: { id: id }
        });
    },

    // 4. GET ALL (GANTI LOGIC SORTING DISINI)
    async getAllTasks(userId: number) {
        return await prisma.task.findMany({
            where: {
                user_id: userId
            },
            // GANTI: createdAt jadi id
            orderBy: {
                id: 'desc' 
            }
        });
    }
}

export default taskService;