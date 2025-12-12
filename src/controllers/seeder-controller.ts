import { Response, Request } from "express";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export class SeederController {
  static async seedDatabase(req: Request, res: Response) {
    try {
      console.log("🌱 Starting seed via API...");

      // Clear existing data
      await prisma.order.deleteMany();
      await prisma.customer.deleteMany();
      await prisma.restaurant.deleteMany();

      // Seed Customers
      console.log("📝 Seeding customers...");
      const customer1 = await prisma.customer.create({
        data: {
          name: "John Doe",
          phone: "081234567890",
        },
      });

      const customer2 = await prisma.customer.create({
        data: {
          name: "Jane Smith",
          phone: "082345678901",
        },
      });

      const customer3 = await prisma.customer.create({
        data: {
          name: "Budi Santoso",
          phone: "083456789012",
        },
      });

      // Seed Restaurants
      console.log("🍽️ Seeding restaurants...");
      const restaurant1 = await prisma.restaurant.create({
        data: {
          name: "Warung Makan Jaya",
          description: "Restoran tradisional Indonesia dengan menu lengkap",
          isOpen: true,
        },
      });

      const restaurant2 = await prisma.restaurant.create({
        data: {
          name: "Pizza Italia",
          description: "Restoran Italia dengan pizza autentik",
          isOpen: true,
        },
      });

      const restaurant3 = await prisma.restaurant.create({
        data: {
          name: "Sushi Paradise",
          description: "Restoran Jepang dengan sushi dan ramen premium",
          isOpen: false,
        },
      });

      // Seed Orders
      console.log("🛒 Seeding orders...");
      await prisma.order.create({
        data: {
          customerId: customer1.id,
          restaurantId: restaurant1.id,
          items: 3,
          etaMinutes: 30,
        },
      });

      await prisma.order.create({
        data: {
          customerId: customer2.id,
          restaurantId: restaurant2.id,
          items: 2,
          etaMinutes: 25,
        },
      });

      await prisma.order.create({
        data: {
          customerId: customer3.id,
          restaurantId: restaurant1.id,
          items: 5,
          etaMinutes: 45,
        },
      });

      console.log("✨ Seed completed successfully!");

      res.status(200).json({
        code: 200,
        status: "OK",
        message: "Seed database completed successfully!",
        data: {
          customers: 3,
          restaurants: 3,
          orders: 3,
          users: 3,
          todos: 6,
          summary: {
            customers: [
              { id: customer1.id, name: customer1.name },
              { id: customer2.id, name: customer2.name },
              { id: customer3.id, name: customer3.name },
            ],
            restaurants: [
              { id: restaurant1.id, name: restaurant1.name },
              { id: restaurant2.id, name: restaurant2.name },
              { id: restaurant3.id, name: restaurant3.name },
            ],
          },
        },
      });
    } catch (error) {
      console.error("❌ Seed failed:", error);
    }
  }
}
