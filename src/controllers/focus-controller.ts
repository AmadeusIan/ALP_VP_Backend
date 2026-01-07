import { Request, Response, NextFunction } from "express";
import { FocusService } from "../services/focus-service";

export class FocusController {

  // =========================
  // GET ALL
  // =========================
  static async getAll(req: Request, res: Response) {
    try {
      const data = await FocusService.getAll();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // =========================
  // GET ONE BY ID
  // =========================
  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await FocusService.getById(id);

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // =========================
  // CREATE
  // =========================
  static async create(req: Request, res: Response) {
    try {
      const { startTime, endTime, user_id } = req.body;

      const data = await FocusService.create({
        startTime,
        endTime,
        user_id,
      });

      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // =========================
  // UPDATE
  // =========================
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const reqData = req.body; // startTime / endTime / keduanya

      const response = await FocusService.update(id, reqData);

      res.status(200).json({
        success: true,
        data: response,
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
      await FocusService.delete(id);

      res.status(200).json({ success: true, message: "Focus record deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
