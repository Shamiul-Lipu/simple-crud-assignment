import { Schema, model } from "mongoose";
import { Orders, User, usersMethodsModel } from "./user/user.interface";

const OrdersSchema = new Schema<Orders>({
  productName: { type: String, required: [true, "Product name is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  quantity: { type: Number, required: [true, "Quantity is required"] },
});

const userSchema = new Schema<User, usersMethodsModel>({
  userId: {
    type: Number,
    required: [true, "User ID is required"],
    unique: true,
  },
  username: { type: String, required: [true, "Username is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
  },
  age: { type: Number, required: [true, "Age is required"] },
  email: { type: String, required: [true, "Email is required"] },
  isActive: { type: Boolean },
  hobbies: [{ type: String, required: true }],
  address: {
    street: { type: String, required: [true, "Street is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },
  },
  orders: [OrdersSchema],
});

// creating static method
userSchema.statics.isUserExists = async (id: string) => {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

// post aggregate middleware

export const UserModel = model<User, usersMethodsModel>("user", userSchema);

export default {
  userSchema,
};
