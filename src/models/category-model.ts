// Category model sesuai ERD dan relasi ke User & Money
export interface Category {
	id: number; // money_categories_id
	user_id: number;
	budget: number;
	name: string; // money_categories_name
}

// Request untuk membuat kategori
export interface CreateCategoryRequest {
	user_id: number;
	budget: number;
	name: string;
}

// Request untuk update kategori
export interface UpdateCategoryRequest {
	budget?: number;
	name?: string;
}

// Response kategori
export interface CategoryResponse {
	id: number;
	user_id: number;
	budget: number;
	name: string;
}

// Konversi dari hasil Prisma (misal: MoneyCategory) ke response
export function toCategoryResponse(category: any): CategoryResponse {
	return {
		id: category.id,
		user_id: category.user_id,
		budget: category.budget,
		name: category.name,
	};
}
