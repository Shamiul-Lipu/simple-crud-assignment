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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const OrdersSchema = new mongoose_1.Schema({
    productName: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "User ID is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        validate: {
            validator: function (value) {
                // Validate only letters and spaces
                return /^[a-zA-Z\s]*$/.test(value);
            },
            message: "Username must contain only letters and spaces",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            trim: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z\s]*$/.test(value);
                },
                message: "firstName must contain only letters and spaces",
            },
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            trim: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z\s]*$/.test(value);
                },
                message: "lastName must contain only letters and spaces",
            },
        },
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        validate: {
            validator: Number.isInteger,
            message: "Age must be an integer",
        },
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (value) {
                // Simple email validation using regex (modify as needed)
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Email must be a valid format",
        },
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: [{ type: String, required: true }],
    address: {
        street: { type: String, required: [true, "Street is required"] },
        city: { type: String, required: [true, "City is required"] },
        country: { type: String, required: [true, "Country is required"] },
    },
    orders: [OrdersSchema],
});
// creating static method
userSchema.statics.isUserExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield exports.UserModel.findOne({ userId: id });
    return existingUser;
});
// pre middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)("user", userSchema);
exports.default = {
    userSchema,
};
