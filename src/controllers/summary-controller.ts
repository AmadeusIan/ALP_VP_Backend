// src/controllers/summary-controller.ts

import { Request, Response } from 'express';
import summaryService from '../services/summary-service'; 

// Interface helper untuk membaca user dari token
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    }
}

const summaryController = {
    async getSummary(req: Request, res: Response) {
        try {
            // 1. Ambil User ID dari Token
            const userId = (req as AuthRequest).user?.id;

            // Cek jika user tidak ditemukan (belum login/token invalid)
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: User tidak ditemukan.' });
            }

            // 2. Kirim userId ke service
            const summaryData = await summaryService.getAppSummary(userId);
            
            res.status(200).json(summaryData);
        } catch (error) {
             console.error("Error saat mengambil Summary:", error);
             res.status(500).json({ error: 'Gagal mengambil data Summary.' });
        }
    },

    async getAllItems(req: Request, res: Response) {
        try {
            // 1. Ambil User ID dari Token
            const userId = (req as AuthRequest).user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized.' });
            }

            // 2. Kirim userId ke service
            const allItems = await summaryService.getAllItems(userId);
            
            if (!allItems) {
                 return res.status(200).json([]);
            }
            
            res.status(200).json(allItems);
        } catch (error) {
             console.error("Error saat mengambil semua item:", error); 
             res.status(500).json({ error: 'Gagal mengambil semua item.' });
        }
    }
};

export default summaryController;