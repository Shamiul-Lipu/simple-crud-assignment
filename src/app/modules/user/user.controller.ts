import { Request, Response } from "express";
import { userService } from "./user.service";

const createNewUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await userService.createNewUser(user);

    // send response
    res.status(200).json({
      success: true,
      message: "User is created sucessfully",
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

const readAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.readAllUsers();

    // send response
    res.status(200).json({
      success: true,
      message: "all user retrived sucessfully",
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

const readOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.readOneUser(userId);

    // send response
    res.status(200).json({
      success: true,
      message: "user retrived sucessfully",
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    console.log({ usergang: user });
    const result = await userService.updateUser(user);

    // send response
    res.status(200).json({
      success: true,
      message: "user updated sucessfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUser(userId);

    // send response
    res.status(200).json({
      success: true,
      message: "user is created sucessfully",
      data: result,
    });
  } catch (error) {
    // console.log(error);
  }
};

export const userController = {
  createNewUser,
  readAllUsers,
  readOneUser,
  updateUser,
  deleteUser,
};
