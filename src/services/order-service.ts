import { Order } from "../../generated/prisma";
import { ResponseError } from "../error/response-error";
import { 
  OrderCreateRequest,
  OrderResponse,
  toOrderResponse,
  toOrderResponseList
} from "../models/order-model";
import { prismaClient } from "../utils/database-util";
import { OrderValidation } from "../validations/order-validation";
import { Validation } from "../validations/validation";

export class OrderService {

  // GET ALL
  static async getAllOrders(): Promise<OrderResponse[]> {
    const orders = await prismaClient.order.findMany({
      include: {
        customer: true,
        restaurant: true
      }
    });

    return toOrderResponseList(orders);
  }

  // GET ORDER BY ID
  static async getOrderById(orderId: number): Promise<OrderResponse> {
    const order = await prismaClient.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        restaurant: true
      }
    });

    if (!order) throw new ResponseError(404, "Order not found");

    return toOrderResponse(order);
  }

  // GET ORDERS BY CUSTOMER
  static async getOrdersByCustomer(customerId: number): Promise<OrderResponse[]> {
    const orders = await prismaClient.order.findMany({
      where: { customerId },
      include: {
        customer: true,
        restaurant: true
      }
    });

    return toOrderResponseList(orders);
  }

  // GET ORDERS BY RESTAURANT
  static async getOrdersByRestaurant(restaurantId: number): Promise<OrderResponse[]> {
    const orders = await prismaClient.order.findMany({
      where: { restaurantId },
      include: {
        customer: true,
        restaurant: true
      }
    });

    return toOrderResponseList(orders);
  }

  static async getOrdersByTime(time: string): Promise<OrderResponse[]> {
  const parsed = new Date(time);

  if (isNaN(parsed.getTime())) {
    throw new ResponseError(400, "Invalid time format");
  }

  const orders = await prismaClient.order.findMany({
    where: {
      orderedAt: {
        gte: parsed
      }
    },
    include: {
      customer: true,
      restaurant: true
    }
  });

  return toOrderResponseList(orders);
}

  // CREATE ORDER
static async createOrder(request: OrderCreateRequest): Promise<OrderResponse> {
  const data = Validation.validate(OrderValidation.CREATE, request);

  const { customerId, restaurantId, items } = data;

  // Check customer exists
  const customer = await prismaClient.customer.findUnique({
    where: { id: customerId }
  });
  if (!customer) throw new ResponseError(404, "Customer not found");

  // Check restaurant exists
  const restaurant = await prismaClient.restaurant.findUnique({
    where: { id: restaurantId }
  });
  if (!restaurant) throw new ResponseError(404, "Restaurant not found");

  // Calculate ETA (in minutes)
  const etaMinutes = (items * 10) + 10;

  // Save order
  const order = await prismaClient.order.create({
    data: {
      customerId,
      restaurantId,
      items,
      orderedAt: new Date(),
      etaMinutes   // ← hanya integer
    },
    include: {
      customer: true,
      restaurant: true
    }
  });

  return toOrderResponse(order);
}
}
