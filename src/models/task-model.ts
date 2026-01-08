// src/models/task-model.ts
import { z } from 'zod';

// Skema untuk membuat Task baru: Semua wajib kecuali description
export const createTaskSchema = z.object({
    title: z.string().min(1, "Judul Task wajib diisi."),
    description: z.string().optional().nullable(), // Tetap opsional
    // WAJIB DIISI: Kini diperlukan string ISO datetime dari Frontend
    dateTime: z.string().datetime("Format tanggal dan waktu Task tidak valid."), 
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'None']).default('None'),
});

// Skema untuk update Task: Semua field opsional agar bisa update sebagian (partial)
export const updateTaskSchema = z.object({
    title: z.string().min(1, "Judul Task wajib diisi.").optional(),
    description: z.string().optional().nullable(),
    dateTime: z.string().datetime().optional().nullable(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'None']).optional(),
    isCompleted: z.boolean().optional(),
}).partial(); 

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;