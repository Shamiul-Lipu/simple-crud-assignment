import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.retrieveAllUser);
router.post("/", userController.createNewUser);
router.get("/:userId", userController.retrieveUserByID);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export const usersRoutes = router;
