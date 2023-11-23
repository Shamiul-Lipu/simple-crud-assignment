import { UserModel } from "../user.modules";
import { User } from "./user.interface";

const createNewUser = async (user: User): Promise<User> => {
  const result = await UserModel.create(user);
  return result;
};

const retrieveAllUser = async (): Promise<User[] | null> => {
  const result = await UserModel.aggregate([
    {
      $project: {
        _id: 0,
        userId: 1,
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
    return result;
  }
  return false;
};

const deleteUser = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.deleteOne({ userId: userId });
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
};
