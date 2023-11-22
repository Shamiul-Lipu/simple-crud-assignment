import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.readAllUsers);
router.post("/", userController.createNewUser);
router.get("/:userId", userController.readOneUser);
router.patch("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export const usersRoutes = router;
