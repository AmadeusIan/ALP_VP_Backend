// src/models/activity-model.ts
import { z } from 'zod';

// Skema untuk membuat Activity baru
export const createActivitySchema = z.object({
    title: z.string().min(1, "Judul Activity wajib diisi."),
    // Description boleh null atau tidak diisi
    description: z.string().nullable().optional(), 
    
    // WAJIB DIISI: String ISO datetime dari Frontend (validasi datetime)
    startDateTime: z.string().datetime({ message: "Format tanggal mulai tidak valid (Harus ISO 8601)." }), 
    endDateTime: z.string().datetime({ message: "Format tanggal selesai tidak valid (Harus ISO 8601)." }), 
});

// Skema untuk update Activity (Partial = semua jadi optional)
export const updateActivitySchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().nullable().optional(),
    startDateTime: z.string().datetime().nullable().optional(),
    endDateTime: z.string().datetime().nullable().optional(),
    isCompleted: z.boolean().optional(),
});

// PENTING: Nama type disamakan dengan yang di-import di Service tadi
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;