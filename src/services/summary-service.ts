import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SummaryService {
    async getAppSummary(userId: number) {
        try {
            const allTasks = await prisma.task.findMany({ where: { user_id: userId } });
            const allActivities = await prisma.activity.findMany({ where: { user_id: userId } });
            
            const totalItems = allTasks.length + allActivities.length;
            const completedTasks = allTasks.filter((t: any) => t.status === "Done" || t.status === "Completed").length;
            const completedActivities = 0; 

            const totalCompleted = completedTasks + completedActivities;
            const percentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
            
            return {
                todayAlmostDonePercentage: percentage
            };
        } catch (error) {
            console.error("SERVICE ERROR: Summary failed:", error);
            throw new Error("Gagal memproses Summary.");
        }
    }

    async getAllItems(userId: number) {
        try {
            // GANTI: orderBy createdAt -> id
            const tasks = await prisma.task.findMany({ 
                where: { user_id: userId },
                orderBy: { id: 'desc' } 
            });
            // GANTI: orderBy createdAt -> id
            const activities = await prisma.activity.findMany({ 
                where: { user_id: userId },
                orderBy: { id: 'desc' } 
            });

            const combinedItems = [
                ...tasks.map((t: any) => ({ 
                    ...t, 
                    type: 'Task', 
                    dateTime: t.due_date ? t.due_date.toISOString() : null,
                    isCompleted: t.status === "Done",
                    startDateTime: null, 
                    endDateTime: null, 
                })),
                ...activities.map((a: any) => ({ 
                    ...a, 
                    type: 'Activity', 
                    dateTime: a.startDateTime ? a.startDateTime.toISOString() : null, 
                    startDateTime: a.startDateTime ? a.startDateTime.toISOString() : null,
                    endDateTime: a.endDateTime ? a.endDateTime.toISOString() : null,
                }))
            ];
            
            // GANTI LOGIC SORTING AKHIR
            // Karena tidak ada createdAt, kita urutkan berdasarkan dateTime (Jadwal terdekat di atas)
            combinedItems.sort((a, b) => {
                const dateA = a.dateTime ? new Date(a.dateTime).getTime() : 0;
                const dateB = b.dateTime ? new Date(b.dateTime).getTime() : 0;
                // Urutkan dari yang paling baru (masa depan) ke lama, atau sebaliknya.
                // Ini logic: Yang paling baru dibuat (biasanya ID besar) atau yang deadline-nya paling dekat?
                // Kita pakai logic ID saja biar konsisten "Versi Malas" (ID Besar = Paling atas)
                return b.id - a.id; 
            });

            return combinedItems;

        } catch (error) {
            console.error("SERVICE ERROR: Get All Items failed:", error);
            throw new Error("Gagal mengambil data.");
        }
    }
}

export default new SummaryService();