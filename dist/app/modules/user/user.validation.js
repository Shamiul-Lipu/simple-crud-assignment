"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidatorSchema = exports.userValidatorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const OrdersValidatorSchema = joi_1.default.object({
    productName: joi_1.default.string().trim().required().messages({
        "string.empty": "Product name cannot be empty",
        "any.required": "Product name is required",
    }),
    price: joi_1.default.number().min(0).required().messages({
        "number.min": "Price must be a positive number or zero",
        "any.required": "Price is required",
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity must be at least 1",
        "any.required": "Quantity is required",
    }),
});
exports.OrdersValidatorSchema = OrdersValidatorSchema;
const userValidatorSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().min(1).required().messages({
        "number.integer": "User ID must be an integer",
        "number.min": "User ID must be at least 1",
        "any.required": "User ID is required",
    }),
    username: joi_1.default.string()
        .trim()
        .max(30)
        .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
        .required()
        .messages({
        "string.empty": "Username cannot be empty",
        "string.max": "Username cannot exceed 30 characters",
        "any.required": "Username is required",
        "string.pattern.base": "Username must contain only letters",
    }),
    password: joi_1.default.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
    }),
    fullName: joi_1.default.object({
        firstName: joi_1.default.string()
            .trim()
            .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
            .required()
            .messages({
            "any.required": "First Name is required",
            "string.empty": "First Name cannot be empty",
            "string.pattern.base": "First Name must contain only alphabetic characters",
        }),
        lastName: joi_1.default.string()
            .trim()
            .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
            .required()
            .messages({
            "any.required": "Last Name is required",
            "string.empty": "Last Name cannot be empty",
            "string.pattern.base": "Last Name must contain only alphabetic characters",
        }),
    }),
    age: joi_1.default.number().integer().max(120).required().messages({
        "number.integer": "Age must be an integer",
        "number.max": "Age cannot exceed 120",
        "any.required": "Age is required",
    }),
    email: joi_1.default.string().trim().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
    }),
    isActive: joi_1.default.boolean().required().messages({
        "any.required": "Active status is required",
    }),
    hobbies: joi_1.default.array().items(joi_1.default.string()).required().messages({
        "any.required": "Hobbies are required",
        "array.base": "Hobbies must be an array of strings",
    }),
    address: joi_1.default.object({
        street: joi_1.default.string().required().messages({
            "any.required": "Street is required",
            "string.empty": "Street cannot be empty",
        }),
        city: joi_1.default.string().required().messages({
            "any.required": "City is required",
            "string.empty": "City cannot be empty",
        }),
        country: joi_1.default.string().required().messages({
            "any.required": "Country is required",
            "string.empty": "Country cannot be empty",
        }),
    }),
    orders: joi_1.default.array().items(OrdersValidatorSchema),
});
exports.userValidatorSchema = userValidatorSchema;
