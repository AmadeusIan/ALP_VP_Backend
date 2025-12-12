import { Restaurant } from "../../generated/prisma";
import { ResponseError } from "../error/response-error";
import {
  RestaurantCreateRequest,
  RestaurantUpdateNameRequest,
  RestaurantUpdateDescriptionRequest,
  RestaurantUpdateStatusRequest,
  RestaurantResponse,
  toRestaurantResponse,
  toRestaurantResponseList
} from "../models/restaurant-model";
import { prismaClient } from "../utils/database-util";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { Validation } from "../validations/validation";

export class RestaurantService {

  // GET ALL
  static async getAllRestaurants(): Promise<RestaurantResponse[]> {
    const restaurants = await prismaClient.restaurant.findMany();
    return toRestaurantResponseList(restaurants);
  }

  // GET BY ID
  static async getRestaurantById(id: number): Promise<RestaurantResponse> {
    const restaurant = await prismaClient.restaurant.findUnique({
      where: { id }
    });

    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found");
    }

    return toRestaurantResponse(restaurant);
  }

  // GET BY STATUS
  static async getRestaurantsByStatus(isOpen: boolean): Promise<RestaurantResponse[]> {
    const restaurants = await prismaClient.restaurant.findMany({
      where: { isOpen }
    });

    return toRestaurantResponseList(restaurants);
  }

  // CREATE
  static async createRestaurant(request: RestaurantCreateRequest): Promise<RestaurantResponse> {
    const data = Validation.validate(RestaurantValidation.CREATE, request);

    const restaurant = await prismaClient.restaurant.create({
      data
    });

    return toRestaurantResponse(restaurant);
  }

  static async updateRestaurant(
  id: number,
  payload: { name?: string; description?: string; isOpen?: boolean }
) {
  return prismaClient.restaurant.update({
    where: { id },
    data: payload,
  });
}
  // DELETE
  static async deleteRestaurant(id: number): Promise<RestaurantResponse> {

    await this.getRestaurantById(id);

    const restaurant = await prismaClient.restaurant.delete({
      where: { id }
    });

    return toRestaurantResponse(restaurant);
  }
}
