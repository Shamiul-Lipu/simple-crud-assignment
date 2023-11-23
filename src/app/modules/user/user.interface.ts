import { Model } from "mongoose";

export interface Orders {
  productName: string;
  price: number;
  quantity: number;
}

export interface User {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: Orders[];
}

export interface usersMethodsModel extends Model<User> {
  isUserExists(id: number): Promise<boolean | null>;
}
