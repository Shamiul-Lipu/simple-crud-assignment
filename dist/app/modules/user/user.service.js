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
exports.userService = void 0;
const user_modules_1 = require("../user.modules");
//  Create a new user
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_modules_1.UserModel.create(user);
    // Providing the necessary response by generating an aggregation
    const aggregatedResult = yield user_modules_1.UserModel.aggregate([
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
});
//  Retrieve a list of all users
const retrieveAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_modules_1.UserModel.aggregate([
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
});
//  Retrieve a specific user by ID
const retrieveUserByID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_modules_1.UserModel.isUserExists(userId)) {
        const result = yield user_modules_1.UserModel.aggregate([
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
});
//  Update user information
const updateUser = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_modules_1.UserModel.isUserExists(userId)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = yield user_modules_1.UserModel.findOneAndUpdate({ userId: userId }, { $set: Object.assign({}, user) }, { new: true, runValidators: true });
        // Providing the necessary response by generating an aggregation
        const aggregatedResult = yield user_modules_1.UserModel.aggregate([
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
});
// Delete a user
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_modules_1.UserModel.isUserExists(userId)) {
        const result = yield user_modules_1.UserModel.deleteOne({ userId: userId });
        return result;
    }
    return false;
});
// Add New Products in Users Order
const addNewProductsInOrder = (userId, orders) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_modules_1.UserModel.isUserExists(userId)) {
        const result = yield user_modules_1.UserModel.findOneAndUpdate({ userId: userId }, { $push: { orders: { $each: [orders] } } }, { new: true, runValidators: true });
        return result;
    }
    return false;
});
//  Retrieve all orders for a specific user
const retrieveAllordersOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_modules_1.UserModel.isUserExists(userId)) {
        // Providing the necessary response by generating an aggregation
        const result = yield user_modules_1.UserModel.aggregate([
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
});
//  Calculate Total Price of Orders for a Specific User
const calculateTotalOrdersOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_modules_1.UserModel.isUserExists(userId)) {
        const result = yield user_modules_1.UserModel.aggregate([
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
});
exports.userService = {
    createNewUser,
    retrieveAllUser,
    retrieveUserByID,
    updateUser,
    deleteUser,
    addNewProductsInOrder,
    retrieveAllordersOfUser,
    calculateTotalOrdersOfUser,
};
