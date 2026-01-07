import { Request, Response, NextFunction } from "express";
import { MoneyService } from "../services/money-service";
import { ResponseError } from "../error/response-error";

export class MoneyController {

  // =========================
  // GET ALL
  // =========================
  static async getAll(req: Request, res: Response) {
    try {
      const data = await MoneyService.getAll();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // =========================
  // GET ONE
  // =========================
  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await MoneyService.getById(id);

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // =========================
  // CREATE
  // =========================
  static async create(req: Request, res: Response , next: NextFunction) {
    try {
      const { title, description, amount, type, user_id } = req.body;

      const data = await MoneyService.create({
        title,
        description,
        amount,
        type,
        user_id,
      });

      res.status(201).json({ success: true, data });
    } catch (error: any) { 
      res.status(400).json({ success: false, message: error.message });
      console.log(error);   // ⬅️ WAJIB di controller
      next(error);         // ⬅️ Tambahkan ini untuk meneruskan error ke error middleware
    }
  }

  // =========================
  // UPDATE
  // =========================
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const reqData = req.body; // boleh title/description/amount/type atau kombinasi

      const updated = await MoneyService.update(id, reqData);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // DELETE
  // =========================
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleted = await MoneyService.delete(id);

      res.status(200).json({
        success: true,
        message: "Money record deleted",
        data: deleted,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
