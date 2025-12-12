import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/restaurant-service";

export class RestaurantController {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await RestaurantService.getAllRestaurants();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await RestaurantService.getRestaurantById(id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  static async getByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status === "open" ? true : false;
      const data = await RestaurantService.getRestaurantsByStatus(status);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, description, isOpen } = req.body;
      const data = await RestaurantService.createRestaurant({
        name,
        description,
        isOpen,
      });
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }


  static async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { name, description, isOpen } = req.body;

      const data = await RestaurantService.updateRestaurant(id, {
        name,
        description,
        isOpen,
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }


  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await RestaurantService.deleteRestaurant(id);
      res.status(200).json({
        success: true,
        message: "Restaurant deleted",
      });

    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
