// src/services/activity-service.ts
import { PrismaClient } from "@prisma/client";
import { CreateActivityInput, UpdateActivityInput } from "../models/activity-model";

const prisma = new PrismaClient();

const activityService = {
    // 1. CREATE
    async createActivity(data: CreateActivityInput, userId: number) {
        return await prisma.activity.create({
            data: {
                title: data.title,
                // FIX: Jika null/undefined, ubah jadi string kosong ""
                description: data.description ?? "", 
                
                // Konversi string ISO ke Date Object
                startDateTime: new Date(data.startDateTime),
                endDateTime: new Date(data.endDateTime),
                
                // Hubungkan ke User
                user: {
                    connect: {
                        id: userId 
                    }
                }
            }
        });
    },
    
    // 2. UPDATE
    async updateActivity(id: number, data: UpdateActivityInput) {
        return await prisma.activity.update({
            where: { id: id },
            data: {
                title: data.title,
                
                // FIX UTAMA DISINI: 
                // Prisma tolak 'null' untuk kolom required.
                // Logika: Jika ada isinya pakai itu, jika null/undefined jangan di-update (undefined)
                description: data.description ? data.description : undefined,
                
                startDateTime: data.startDateTime ? new Date(data.startDateTime) : undefined,
                endDateTime: data.endDateTime ? new Date(data.endDateTime) : undefined,
            }
        });
    },
    
    // 3. DELETE
    async deleteActivity(id: number) {
        return await prisma.activity.delete({
            where: { id: id }
        });
    },
    
    // 4. GET ALL
    async getAllActivities(userId: number) {
        return await prisma.activity.findMany({
            where: {
                user_id: userId 
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
};

export default activityService;
