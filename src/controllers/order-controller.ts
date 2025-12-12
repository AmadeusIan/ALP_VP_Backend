import { Request, Response } from "express";
import { OrderService } from "../services/order-service";

export class OrderController {

  static async getAll(req: Request, res: Response) {
    try {
      const data = await OrderService.getAllOrders();
      res.status(200).json({ success: true, data });

    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await OrderService.getOrderById(id);
      res.status(200).json({ success: true, data });

    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  static async getByCustomer(req: Request, res: Response) {
    try {
      const customerId = Number(req.params.customerId);
      const data = await OrderService.getOrdersByCustomer(customerId);
      res.status(200).json({ success: true, data });

    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getByRestaurant(req: Request, res: Response) {
    try {
      const restaurantId = Number(req.params.restaurantId);
      const data = await OrderService.getOrdersByRestaurant(restaurantId);
      res.status(200).json({ success: true, data });

    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getByTime(req: Request, res: Response) {
    try {
      const { time } = req.query;

      if (!time) throw new Error("Time query is required");

      const data = await OrderService.getOrdersByTime(String(time));
      res.status(200).json({ success: true, data });

    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { customerId, restaurantId, items } = req.body;

      const data = await OrderService.createOrder({
        customerId,
        restaurantId,
        items,
      });

      res.status(201).json({ success: true, data });

    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
