import { Router } from "express";
import userAuth from "../middlewares/userAuth";
import createIntentHandler from "../controllers/payment/stripe/createIntent";
import confirmPaymentHandler from "../controllers/payment/stripe/confirmPayment";

const router = Router();

router.post("/stripe/create-intent", userAuth, createIntentHandler);
router.post("/stripe/confirm-payment", userAuth, confirmPaymentHandler);

export default router;
