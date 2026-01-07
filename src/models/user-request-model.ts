<<<<<<< HEAD
import { Request } from "express";
import { UserJWTPayload } from "./user-model";

export interface UserRequest extends Request {
    user?: UserJWTPayload;
=======
import { Request } from "express"; 
import { UserJWTPayload } from "./user-model";


export interface UserRequest extends Request {
    user?: UserJWTPayload
>>>>>>> d2d5edaa69b3a28d91f198e90f1bc0b67c7eaf4e
}