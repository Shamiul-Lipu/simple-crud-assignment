import { UserModel } from "../user.modules";
import { User } from "./user.interface";

const createNewUser = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const readAllUsers = async () => {
  const result = await UserModel.find();
  return result;
};

const readOneUser = async (userId: string) => {
  const result = await UserModel.findOne({ userId: userId });
  return result;
};

const updateUser = async (user: User) => {
  const userId = user.userId;
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $set: { ...user } },
    { new: true, runValidators: true }
  );
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId: userId });
  return result;
};

export const userService = {
  createNewUser,
  readAllUsers,
  readOneUser,
  updateUser,
  deleteUser,
};
