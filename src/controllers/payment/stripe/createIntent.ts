import Stripe from "stripe";
import { getUserById } from "../../../models/user";

const stripe = new Stripe(
  "sk_test_51OiQTMCNny1QRAVkc5n0YxOQqiHlPI1Ev2qrgPa0lsK3Xw0cs4r0tpwcS6XKbNfajzo5APTUGCCyrXAXm8AZJ9DI003kGTKJvr"
);

const createIntentHandler = async (req: any, res: any) => {
  try {
    const user = await getUserById(req.user._id.toString());
    if (!user) return res.status(404).send({ error: "No user found" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    user.stripePaymentIntent.clientSecret = paymentIntent.client_secret;
    user.stripePaymentIntent.paymentIntent = paymentIntent.id;
    user.stripePaymentIntent.planDuration = req.body.planDuration;
    user.stripePaymentIntent.planId = req.body.planId;
    await user.save();

    return res.status(200).send(paymentIntent);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createIntentHandler;
