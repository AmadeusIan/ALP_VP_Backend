import express from 'express'
<<<<<<< HEAD
import { UserController } from '../controller/user-controller';

export const publicRouter = express.Router()

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);
=======
import { UserController } from '../controllers/user-controller';

export  const publicRouter = express.Router();

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);

>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
