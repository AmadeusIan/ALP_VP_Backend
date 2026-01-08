import { prismaClient } from "../utils/database-util";
import { CreateCategoryRequest, UpdateCategoryRequest, toCategoryResponse } from "../models/category-model";

export class CategoryService {
  static async getAll() {
    const categories = await prismaClient.category.findMany();
    return categories.map(toCategoryResponse);
  }

  static async getById(id: number) {
    const category = await prismaClient.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");
    return toCategoryResponse(category);
  }

  static async getByUserId(user_id: number) {
    const categories = await prismaClient.category.findMany({ where: { user_id } });
    return categories.map(toCategoryResponse);
  }

  static async create(request: CreateCategoryRequest) {
    const category = await prismaClient.category.create({ data: request });
    return toCategoryResponse(category);
  }

  static async update(id: number, request: UpdateCategoryRequest) {
    const category = await prismaClient.category.update({ where: { id }, data: request });
    return toCategoryResponse(category);
  }

  static async delete(id: number) {
    await prismaClient.category.delete({ where: { id } });
  }

  // FILTER: Get pengeluaran by user, month, and category
  static async filterByUserMonthCategory(user_id: number, month: number, category: string) {
    // Ambil semua money dengan user_id, category, dan bulan pada createdAt
    const moneys = await prismaClient.money.findMany({
      where: {
        user_id,
        category: {
          name: category,
        },
        createdAt: {
          gte: new Date(new Date().getFullYear(), month - 1, 1),
          lt: new Date(new Date().getFullYear(), month, 1),
        },
        type: "Outcome",
      },
      include: {
        category: true,
      },
    });
    return moneys;
  }
}
