import express from 'express'
import { UserController } from '../controllers/user-controller';
import { RestaurantController } from '../controllers/restaurant-controller';
import { CustomerController } from '../controllers/customer-controller';
import { OrderController } from '../controllers/order-controller';
import { SeederController } from '../controllers/seeder-controller';

export  const publicRouter = express.Router();

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);

// // SEEDER
// publicRouter.post("/seed", SeederController.seedDatabase);

// // CUSTOMER
// publicRouter.get("/customers", CustomerController.getAll)
// publicRouter.get("/customers/:id", CustomerController.getOne)
// publicRouter.post("/customers", CustomerController.create)
// publicRouter.patch("/customers/:id", CustomerController.updateCustomer)
// publicRouter.delete("/customers/:id", CustomerController.delete)

// // RESTAURANT
// publicRouter.get("/restaurants", RestaurantController.getAll)
// publicRouter.get("/restaurants/:id", RestaurantController.getOne)
// publicRouter.get("/restaurants/status/:isOpen", RestaurantController.getByStatus)
// publicRouter.post("/restaurants", RestaurantController.create)
// publicRouter.patch("/restaurants/:id", RestaurantController.updateRestaurant)
// publicRouter.delete("/restaurants/:id", RestaurantController.delete)

// // ORDERS
// publicRouter.get("/orders", OrderController.getAll)
// publicRouter.get("/orders/:id", OrderController.getOne)
// publicRouter.get("/orders/by-customer/:customerId", OrderController.getByCustomer)
// publicRouter.get("/orders/by-restaurant/:restaurantId", OrderController.getByRestaurant)
// publicRouter.post("/orders", OrderController.create)