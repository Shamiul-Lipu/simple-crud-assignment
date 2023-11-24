import { UserModel } from "../user.modules";
import { Orders, User } from "./user.interface";

//  Create a new user
const createNewUser = async (user: User) => {
  const result = await UserModel.create(user);
  // Providing the necessary response by generating an aggregation
  const aggregatedResult = await UserModel.aggregate([
    // stage 1: finding user by userId
    { $match: { userId: result.userId } },
    // stage 2: projecting the only required fields
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
    // stage 1: projecting the only required fields
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
      // stage 1: finding user by userId
      { $match: { userId: userId } },
      // stage 2: projecting the only required fields
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
    // Providing the necessary response by generating an aggregation
    const aggregatedResult = await UserModel.aggregate([
      // stage 1: finding user by userId
      { $match: { userId: userId } },
      // stage 2: projecting the only required fields
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
      { userId: userId },
      { $push: { orders: { $each: [orders] } } },
      { new: true, runValidators: true }
    );
    return result;
  }
  return false;
};

//  Retrieve all orders for a specific user
const retrieveAllordersOfUser = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    // Providing the necessary response by generating an aggregation
    const result = await UserModel.aggregate([
      // stage 1: finding user by userId
      { $match: { userId: userId } },
      // stage 2: deconstructing orders
      {
        $unwind: "$orders",
      },
      // stage 3: projecting out mongodb _id
      {
        $project: {
          "orders._id": 0,
        },
      },
      // stage 4: reconstructing the orders fields
      {
        $group: {
          _id: null,
          orders: { $push: "$orders" },
        },
      },
      // stage 5: projecting the only required fields
      {
        $project: {
          _id: 0,
          orders: 1,
        },
      },
    ]);
    return result;
  }
  return false;
};

//  Calculate Total Price of Orders for a Specific User
const calculateTotalOrdersOfUser = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.aggregate([
      // stage 1: finding user by userId
      { $match: { userId: userId } },
      // stage 2: deconstructing orders
      {
        $unwind: "$orders",
      },
      // stage 3: calculating total order cost using multiply expression
      {
        $project: {
          orders: 1,
          total: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
      // stage 4: grouping to calculate the overall total price.
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$total" },
        },
      },
      // stage 5: projecting totalPrice as per required
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
