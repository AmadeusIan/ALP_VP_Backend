import { Request, Response, NextFunction } from "express";
import { FocusPhaseService } from "../services/focusphase-service";

export class FocusPhaseController {

  // =========================
  // GET ALL
  // =========================
  static async getAll(req: Request, res: Response) {
    try {
      const data = await FocusPhaseService.getAll();
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
      const data = await FocusPhaseService.getById(id);

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // =========================
  // GET BY FOCUS ID
  // =========================
  static async getByFocusId(req: Request, res: Response) {
    try {
      const focus_id = Number(req.params.focus_id);
      const data = await FocusPhaseService.getByFocusId(focus_id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // =========================
  // CREATE
  // =========================
  static async create(req: Request, res: Response) {
    try {
      const { focus_id, type, duration } = req.body;

      const data = await FocusPhaseService.create({
        focus_id,
        type,
        duration,
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
      const reqData = req.body; // type / duration / keduanya

      const response = await FocusPhaseService.update(id, reqData);

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
      await FocusPhaseService.delete(id);

      res.status(200).json({ success: true, message: "FocusPhase record deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
