// src/models/activity-model.ts
import { z } from 'zod';

// Skema untuk membuat Activity baru: Semua wajib kecuali description
export const createActivitySchema = z.object({
    title: z.string().min(1, "Judul Activity wajib diisi."),
    description: z.string().optional().nullable(), // Tetap opsional
    // WAJIB DIISI: Kini diperlukan string ISO datetime dari Frontend
    startDateTime: z.string().datetime("Format tanggal dan waktu mulai tidak valid."), 
    endDateTime: z.string().datetime("Format tanggal dan waktu selesai tidak valid."), 
});

// Skema untuk update Activity: Semua field opsional agar bisa update sebagian (partial)
export const updateActivitySchema = z.object({
    title: z.string().min(1, "Judul Activity wajib diisi.").optional(),
    description: z.string().optional().nullable(),
    startDateTime: z.string().datetime().optional().nullable(),
    endDateTime: z.string().datetime().optional().nullable(),
    isCompleted: z.boolean().optional(),
}).partial();

export type CreateActivityDTO = z.infer<typeof createActivitySchema>;
export type UpdateActivityDTO = z.infer<typeof updateActivitySchema>;