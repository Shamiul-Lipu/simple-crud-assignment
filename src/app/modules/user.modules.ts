import { Schema, model } from "mongoose";
import { Orders, User, usersMethodsModel } from "./user/user.interface";
import bcrypt from "bcrypt";
import config from "../config";

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
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    validate: {
      validator: function (value: string) {
        // Validate only letters and spaces
        return /^[a-zA-Z\s]*$/.test(value);
      },
      message: "Username must contain only letters and spaces",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z\s]*$/.test(value);
        },
        message: "firstName must contain only letters and spaces",
      },
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z\s]*$/.test(value);
        },
        message: "lastName must contain only letters and spaces",
      },
    },
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    validate: {
      validator: Number.isInteger,
      message: "Age must be an integer",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (value: string) {
        // Simple email validation using regex (modify as needed)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Email must be a valid format",
    },
  },
  isActive: {
    type: Boolean,
    required: true,
  },
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

// pre middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const UserModel = model<User, usersMethodsModel>("user", userSchema);

export default {
  userSchema,
};
