import { Router } from "express";
import getUser from "../controllers/user/getUser";
import generateApiHandler from "../controllers/user/generateApi";
import userAuth from "../middlewares/userAuth";
import updatePersonalDetailsHandler from "../controllers/user/updatePersonalDetails";
import changePasswordHandler from "../controllers/user/changePassword";
import getAllUsersHandler from "../controllers/user/getAllUsers";
import resetPasswordHandler from "../controllers/user/resetPassword";
import deleteUserHandler from "../controllers/user/deleteUser";
import updateUserHandler from "../controllers/user/updateUser";
// import getUserByIdHandler from "../controllers/user/getUserById";

const router = Router();

router.get("/user", userAuth, getUser);

// router.get("/user/id", userAuth, getUserByIdHandler);

router.get("/users", userAuth, getAllUsersHandler);

router.get("/user/generate-api", userAuth, generateApiHandler);

router.post("/user/update", userAuth, updateUserHandler);

router.post(
  "/user/update-personal-detail",
  userAuth,
  updatePersonalDetailsHandler
);

router.post("/user/change-password", userAuth, changePasswordHandler);

router.post("/user/reset-password", userAuth, resetPasswordHandler);

router.post("/user/delete", userAuth, deleteUserHandler);

export default router;
