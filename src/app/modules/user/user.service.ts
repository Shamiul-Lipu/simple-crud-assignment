import { UserModel } from "../user.modules";
import { Orders, User } from "./user.interface";

//  Create a new user
const createNewUser = async (user: User) => {
  const result = await UserModel.create(user);
  const aggregatedResult = await UserModel.aggregate([
    { $match: { userId: result.userId } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ]);
  return aggregatedResult;
};

//  Retrieve a list of all users
const retrieveAllUser = async (): Promise<User[] | null> => {
  const result = await UserModel.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

//  Retrieve a specific user by ID
const retrieveUserByID = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.aggregate([
      // stage 1
      { $match: { userId: userId } },
      // stage 2
      {
        $project: {
          _id: 0,
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          hobbies: 1,
          address: 1,
        },
      },
    ]);
    return result;
  }
  return false;
};

//  Update user information
const updateUser = async (userId: number, user: User) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      { $set: { ...user } },
      { new: true, runValidators: true }
    );
    const aggregatedResult = await UserModel.aggregate([
      { $match: { userId: userId } },
      {
        $project: {
          _id: 0,
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          hobbies: 1,
          address: 1,
        },
      },
    ]);
    return aggregatedResult;
  }
  return false;
};

// Delete a user
const deleteUser = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.deleteOne({ userId: userId });
    return result;
  }
  return false;
};

// Add New Products in Users Order
const addNewProductsInOrder = async (userId: number, orders: Orders) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOneAndUpdate(
      { userId },
      {
        $push: { orders: { $each: orders }, $setonInsert: { orders: orders } },
      },
      { upsert: true, new: true, runValidators: true }
    );
    return result;
  }
  return false;
};

//  Retrieve all orders for a specific user
const retrieveAllordersOfUser = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.aggregate([
      // stage 1
      { $match: { userId: userId } },
      {
        $unwind: "$orders",
      },
      {
        $project: {
          "orders._id": 0,
        },
      },
      // {
      //   $project: {
      //     _id: 0,
      //     orders: 1,
      //   },
      // },
      {
        $group: { _id: "$orders" },
      },
      { $unwind: "$_id" },
    ]);
    return result;
  }
  return false;
};

//  Calculate Total Price of Orders for a Specific User
const calculateTotalOrdersOfUser = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.aggregate([
      // stage 1
      { $match: { userId: userId } },
      // stage 2
      {
        $unwind: "$orders",
      },
      {
        $project: {
          orders: 1,
          total: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$total" },
        },
      },
      {
        $project: { _id: 0, totalPrice: 1 },
      },
    ]);
    return result;
  }
  return false;
};

export const userService = {
  createNewUser,
  retrieveAllUser,
  retrieveUserByID,
  updateUser,
  deleteUser,
  addNewProductsInOrder,
  retrieveAllordersOfUser,
  calculateTotalOrdersOfUser,
};
