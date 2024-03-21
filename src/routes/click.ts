import { Router } from "express";
import userAuth from "../middlewares/userAuth";
import createClickHandler from "../controllers/click/createClick";
import getAllUserClickHandler from "../controllers/click/getAllUserClicks";
import getAllClicksHandler from "../controllers/click/getAllClicks";

const router = Router();

router.post("/click/create", createClickHandler);

router.get("/clicks", userAuth, getAllClicksHandler);

router.get("/clicks/user", userAuth, getAllUserClickHandler);

export default router;
