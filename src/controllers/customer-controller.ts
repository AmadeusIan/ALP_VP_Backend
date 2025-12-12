import { Request, Response, NextFunction } from "express"
import { CustomerService } from "../services/customer-service";

export class CustomerController {

  static async getAll(req: Request, res: Response) {
    try {
      const data = await CustomerService.getAll();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await CustomerService.getById(id);

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, phone } = req.body;
      const data = await CustomerService.create({ name, phone });

      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

 static async updateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const reqData = req.body; // name / phone / keduanya

    const response = await CustomerService.updateCustomer(id, reqData);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
}


  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await CustomerService.delete(id);

      res.status(200).json({ success: true, message: "Customer deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
