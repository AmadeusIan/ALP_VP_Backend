import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category-service";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../models/category-model";

export class CategoryController {
  // GET ALL
  static async getAll(req: Request, res: Response) {
    try {
      const data = await CategoryService.getAll();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET ONE
  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await CategoryService.getById(id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // GET BY USER ID
  static async getByUserId(req: Request, res: Response) {
    try {
      const user_id = Number(req.params.user_id);
      const data = await CategoryService.getByUserId(user_id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // CREATE
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const data = await CategoryService.create(request);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      const data = await CategoryService.update(id, request);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await CategoryService.delete(id);
      res.status(204).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  // FILTER: Get pengeluaran by user, month, and category
  static async filterByUserMonthCategory(req: Request, res: Response) {
    try {
      const user_id = Number(req.query.user_id);
      const month = Number(req.query.month); // 1-12
      const category = String(req.query.category);
      const data = await CategoryService.filterByUserMonthCategory(user_id, month, category);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
