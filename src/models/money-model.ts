// export interface CreateMoneyRequest {
//     title: string;
//     description?: string;
//     amount: number;
//     type: string;
//     user_id: number;
// }

// export interface UpdateMoneyRequest {
//     title?: string;
//     description?: string;
//     amount?: number;
//     type?: string;
// }

// export interface MoneyResponse {
//     id: number;
//     title: string;
//     description: string | null;
//     amount: number;
//     type: string;
//     createdAt: Date;
//     user_id: number;
// }

// export function toMoneyResponse(money: any): MoneyResponse {
//     return {
//         id: money.id,
//         title: money.title,
//         description: money.description,
//         amount: money.amount,
//         type: money.type,
//         createdAt: money.createdAt,
//         user_id: money.user_id
//     };
// }
