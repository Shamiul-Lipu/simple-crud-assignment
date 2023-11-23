import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.retrieveAllUser);
router.post("/", userController.createNewUser);
router.get("/:userId", userController.retrieveUserByID);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.put("/:userId/orders", userController.addNewProductsInOrder);
router.get("/:userId/orders", userController.retrieveAllordersOfUser);
router.get(
  "/:userId/orders/total-price",
  userController.calculateTotalOrdersOfUser
);

export const usersRoutes = router;
