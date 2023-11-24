import { Request, Response } from "express";
import { userService } from "./user.service";
import { OrdersValidatorSchema, userValidatorSchema } from "./user.validation";

// Create a new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const { error, value } = userValidatorSchema.validate(user);
    // console.log(error, value);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
        error: {
          code: 400,
          description: "Validation failed",
        },
      });
    }

    const result = await userService.createNewUser(value);

    // send success response
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

// Retrieve a list of all users
const retrieveAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.retrieveAllUser();

    // send response
    res.json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    // send response
    res.json({
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
    res.json({
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
    res.json({
      success: true,
      message: "User updated successfully!",
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

// Delete a user
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
    res.json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    // console.log(error);
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: `${error.message}`,
      },
    });
  }
};

// Add New Products in Users Order
const addNewProductsInOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = req.body;

    const { error, value } = OrdersValidatorSchema.validate(orders);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
        error: {
          code: 400,
          description: "Validation failed",
        },
      });
    }

    const result = await userService.addNewProductsInOrder(
      parseInt(userId),
      value
    );

    console.log({ result: result }, userId);

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

    res.json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error: any) {
    // console.log(error);
    res.status(404).json({
      success: false,
      message: "Somthing went wrong",
      error: {
        code: 404,
        description: `${error.message}`,
      },
    });
  }
};

//  Retrieve all orders for a specific user
const retrieveAllordersOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.retrieveAllordersOfUser(parseInt(userId));
    // console.log(userId, result);
    if (result) {
      res.json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    } else {
      return res.json({
        success: false,
        message: "Somthing went wrong",
        error: {
          code: 404,
          description: `The user ID you entered does not exist!`,
        },
      });
    }
  } catch (error: any) {
    // console.log(error);
    return res.json({
      success: false,
      message: "Somthing went wrong",
      error: {
        code: 404,
        description: `${error.message}`,
      },
    });
  }
};

//  Calculate Total Price of Orders for a Specific User
const calculateTotalOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.calculateTotalOrdersOfUser(
      parseInt(userId)
    );
    // console.log(result, userId);
    if (result) {
      res.json({
        success: true,
        message: "Total price calculated successfully!",
        data: result,
      });
    } else {
      return res.json({
        success: false,
        message: "Somthing went wrong",
        error: {
          code: 404,
          description: `The user ID you entered does not exist!`,
        },
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

export const userController = {
  createNewUser,
  retrieveAllUser,
  retrieveUserByID,
  updateUser,
  deleteUser,
  addNewProductsInOrder,
  retrieveAllordersOfUser,
  calculateTotalOrdersOfUser,
};
