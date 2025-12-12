import { Customer } from "../../generated/prisma";
import { ResponseError } from "../error/response-error";
import {
  CustomerCreateRequest,
  CustomerUpdateNameRequest,
  CustomerUpdatePhoneRequest,
  CustomerResponse,
  toCustomerResponse,
  toCustomerResponseList
} from "../models/customer-model";
import { prismaClient } from "../utils/database-util";
import { CustomerValidation } from "../validations/customer-validation";
import { Validation } from "../validations/validation";

export class CustomerService {

  static async getAll(): Promise<CustomerResponse[]> {
    const customers = await prismaClient.customer.findMany();
    return toCustomerResponseList(customers);
  }

  static async getById(id: number): Promise<CustomerResponse> {
    const customer = await prismaClient.customer.findUnique({
      where: { id }
    });

    if (!customer) {
      throw new ResponseError(404, "Customer not found");
    }

    return toCustomerResponse(customer);
  }

  static async create(request: CustomerCreateRequest): Promise<CustomerResponse> {
    const createRequest = Validation.validate(CustomerValidation.CREATE, request);

    const customer = await prismaClient.customer.create({
      data: createRequest
    });

    return toCustomerResponse(customer);
  }

  static async updateCustomer(id: number, reqData: any) {
  // validasi minimal harus ada salah satu field
  if (!reqData.name && !reqData.phone) {
    throw new Error("Minimal isi name atau phone");
  }

  const updated = await prismaClient.customer.update({
    where: { id },
    data: {
      name: reqData.name,
      phone: reqData.phone,
    }
  });

  return updated;
}


  static async delete(id: number): Promise<CustomerResponse> {
    await this.getById(id);

    const customer = await prismaClient.customer.delete({
      where: { id }
    });

    return toCustomerResponse(customer);
  }
}
