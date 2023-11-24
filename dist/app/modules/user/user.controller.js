"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
// Create a new user
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { error, value } = user_validation_1.userValidatorSchema.validate(user);
        // console.log(error, value);
        // error response based on joi validation
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
        const result = yield user_service_1.userService.createNewUser(value);
        // send success response
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: {
                code: 500,
                description: "The user ID you entered might be exists already!",
            },
        });
    }
});
// Retrieve a list of all users
const retrieveAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.retrieveAllUser();
        // send response
        res.json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (error) {
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
});
//  Retrieve a specific user by ID
const retrieveUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.retrieveUserByID(parseInt(userId));
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
    }
    catch (error) {
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
});
//  Update user information
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = req.body;
        const result = yield user_service_1.userService.updateUser(parseInt(userId), user);
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
    }
    catch (error) {
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
});
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.deleteUser(parseInt(userId));
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
    }
    catch (error) {
        // console.log(error);
        res.json({
            success: false,
            message: "Somthing went wrong",
            error: {
                code: 404,
                description: `${error.message}`,
            },
        });
    }
});
// Add New Products in Users Order
const addNewProductsInOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = req.body;
        const { error, value } = user_validation_1.OrdersValidatorSchema.validate(orders);
        // error response based on joi validation
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
        const result = yield user_service_1.userService.addNewProductsInOrder(parseInt(userId), value);
        // console.log({ result: result }, userId);
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
    }
    catch (error) {
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
});
//  Retrieve all orders for a specific user
const retrieveAllordersOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.retrieveAllordersOfUser(parseInt(userId));
        // console.log(userId, result);
        if (result) {
            res.json({
                success: true,
                message: "Order fetched successfully!",
                data: result,
            });
        }
        else {
            return res.json({
                success: false,
                message: "Somthing went wrong",
                error: {
                    code: 404,
                    description: `The user ID you entered does not exist!`,
                },
            });
        }
    }
    catch (error) {
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
});
//  Calculate Total Price of Orders for a Specific User
const calculateTotalOrdersOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userService.calculateTotalOrdersOfUser(parseInt(userId));
        // console.log(result, userId);
        if (result) {
            res.json({
                success: true,
                message: "Total price calculated successfully!",
                data: result,
            });
        }
        else {
            return res.json({
                success: false,
                message: "Somthing went wrong",
                error: {
                    code: 404,
                    description: `The user ID you entered does not exist!`,
                },
            });
        }
    }
    catch (error) {
        // console.log(error);
        res.json({
            success: false,
            message: "Somthing went wrong",
            error: {
                code: 404,
                description: `${error.message}`,
            },
        });
    }
});
exports.userController = {
    createNewUser,
    retrieveAllUser,
    retrieveUserByID,
    updateUser,
    deleteUser,
    addNewProductsInOrder,
    retrieveAllordersOfUser,
    calculateTotalOrdersOfUser,
};
