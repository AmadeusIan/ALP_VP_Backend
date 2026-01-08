// src/controllers/summary-controller.ts (VERSI REVISI)

import { Request, Response } from 'express';
import summaryService from '../services/summary-service'; 

const summaryController = {
    async getSummary(req: Request, res: Response) {
        try {
            const summaryData = await summaryService.getAppSummary();
            
           
            res.status(200).json(summaryData);
        } catch (error) {
             console.error("Error saat mengambil Summary:", error);
             res.status(500).json({ error: 'Gagal mengambil data Summary.' });
        }
    },

    async getAllItems(req: Request, res: Response) {
        try {
            const allItems = await summaryService.getAllItems();
            
           
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