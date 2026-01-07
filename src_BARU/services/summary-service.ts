// src/services/summary-service.ts (VERSI REVISI)

import prisma from '../lib/prisma';

class SummaryService {
    async getAppSummary() {
        try {
            // FindMany() akan mengembalikan [] jika tidak ada data, yang aman.
            const allTasks = await prisma.task.findMany();
            const allActivities = await prisma.activity.findMany();
            
            const totalItems = allTasks.length + allActivities.length;
            const completedTasks = allTasks.filter(t => t.isCompleted).length;
            const completedActivities = allActivities.filter(a => a.isCompleted).length;
            const totalCompleted = completedTasks + completedActivities;

            // Pastikan pembagian dihindari jika totalItems adalah 0
            const percentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
            
            return {
                todayAlmostDonePercentage: percentage
            };
        } catch (error) {
            // Log error untuk debugging di server
            console.error("SERVICE ERROR: Gagal menghitung Summary:", error);
            // Lempar error agar controller bisa merespons dengan 500 Internal Server Error
            throw new Error("Gagal memproses Summary data.");
        }
    }

    async getAllItems() {
        try {
            // FindMany() akan mengembalikan [] jika tidak ada data, yang aman.
            const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
            const activities = await prisma.activity.findMany({ orderBy: { createdAt: 'desc' } });

            // Gabungkan dan konversi waktu output
            const combinedItems = [
                ...tasks.map(t => ({ 
                    ...t, 
                    type: 'Task', 
                    // Konversi ke ISOString hanya jika ada nilai (safeguard)
                    dateTime: t.dateTime ? t.dateTime.toISOString() : null,
                    startDateTime: null, 
                    endDateTime: null, 
                })),
                ...activities.map(a => ({ 
                    ...a, 
                    type: 'Activity', 
                    // Konversi ke ISOString hanya jika ada nilai (safeguard)
                    dateTime: a.startDateTime ? a.startDateTime.toISOString() : null, 
                    startDateTime: a.startDateTime ? a.startDateTime.toISOString() : null,
                    endDateTime: a.endDateTime ? a.endDateTime.toISOString() : null,
                }))
            ];
            
            // Urutkan berdasarkan createdAt terbaru
            combinedItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            // Jika kosong, mengembalikan []
            return combinedItems;

        } catch (error) {
            // Log error untuk debugging di server
            console.error("SERVICE ERROR: Gagal mengambil semua item:", error);
            // Lempar error agar controller bisa merespons dengan 500 Internal Server Error
            throw new Error("Gagal mengambil data dari database.");
        }
    }
}

export default new SummaryService();