import { Request, Response } from "express";
import { userService } from "./user.service";

// Create a new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
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

// Retrieve a list of all users
const retrieveAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.retrieveAllUser();

    // send response
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    // send response
    res.status(404).json({
      success: false,
      message: "Somthing went wrong",
      error: {
        code: 404,
        description: "Failed to fetch users!",
      },
    });
    // console.log(error);
  }
};

//  Retrieve a specific user by ID
const retrieveUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.retrieveUserByID(parseInt(userId));

    // response based on user exists or not
    if (!result) {
      return res.json({
        success: false,
        message: "Somthing went wrong",
        error: {
          code: 404,
          description: "The user ID you entered does not exist!",
        },
      });
    }

    // send response based on user id
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    // console.log(error);
    return res.json({
      success: false,
      message: "Somthing went wrong",
      error: {
        code: 404,
        description: "Somthing went wrong!",
      },
    });
  }
};

//  Update user information
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = req.body;
    const result = await userService.updateUser(parseInt(userId), user);

    if (!result) {
      return res.json({
        success: false,
        message: "Somthing went wrong",
        error: {
          code: 404,
          description: `The user ID you entered does not exist!`,
        },
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: "user updated sucessfully",
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: `${error.message}`,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUser(parseInt(userId));

    if (!result) {
      return res.json({
        success: false,
        message: "Somthing went wrong",
        error: {
          code: 404,
          description: `The user ID you entered does not exist!`,
        },
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    // console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: `${error.message}`,
      },
    });
  }
};

export const userController = {
  createNewUser,
  retrieveAllUser,
  retrieveUserByID,
  updateUser,
  deleteUser,
};
