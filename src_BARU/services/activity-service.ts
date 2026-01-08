// src/services/activity-service.ts
import prisma from '../lib/prisma';
import { CreateActivityDTO, UpdateActivityDTO } from '../models/activity-model'; 

class ActivityService {
    async createActivity(data: CreateActivityDTO) {
        // Konversi dua field waktu baru
        const { title, description, startDateTime, endDateTime } = data; 
        
        const activityData = {
            title: title,
            description: description,
            startDateTime: startDateTime ? new Date(startDateTime) : undefined, 
            endDateTime: endDateTime ? new Date(endDateTime) : undefined, 
            isCompleted: false,
        };
        return prisma.activity.create({ data: activityData });
    }
    
    async updateActivity(id: string, data: UpdateActivityDTO) {
        const dataForUpdate = {
            ...data,
            startDateTime: data.startDateTime ? new Date(data.startDateTime) : undefined,
            endDateTime: data.endDateTime ? new Date(data.endDateTime) : undefined,
        };
        return prisma.activity.update({ where: { id }, data: dataForUpdate as any });
    }
    
    async deleteActivity(id: string) {
        return prisma.activity.delete({ where: { id } });
    }
    
    async getAllActivities() {
        return prisma.activity.findMany({ orderBy: { createdAt: 'desc' } });
    }
}

export default new ActivityService();