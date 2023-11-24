"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/", user_controller_1.userController.retrieveAllUser);
router.post("/", user_controller_1.userController.createNewUser);
router.get("/:userId", user_controller_1.userController.retrieveUserByID);
router.put("/:userId", user_controller_1.userController.updateUser);
router.delete("/:userId", user_controller_1.userController.deleteUser);
router.put("/:userId/orders", user_controller_1.userController.addNewProductsInOrder);
router.get("/:userId/orders", user_controller_1.userController.retrieveAllordersOfUser);
router.get("/:userId/orders/total-price", user_controller_1.userController.calculateTotalOrdersOfUser);
exports.usersRoutes = router;
