import { Router } from "express";
import getUserPlanHandler from "../controllers/plan/getUserPlan";
import getAllPlanHandler from "../controllers/plan/getAllPlans";
import userAuth from "../middlewares/userAuth";
import createPlanHandler from "../controllers/plan/createPlan";
import updatePlanHandler from "../controllers/plan/updatePlan";
import deletePlanHandler from "../controllers/plan/deletePlan";

const router = Router();

router.post("/plan/create", userAuth, createPlanHandler);

router.post("/plan/update", userAuth, updatePlanHandler);

router.post("/plan/delete", userAuth, deletePlanHandler);

router.get("/plan/user", userAuth, getUserPlanHandler);

router.get("/plans", getAllPlanHandler);

export default router;
