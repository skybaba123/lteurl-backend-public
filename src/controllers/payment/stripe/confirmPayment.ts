import Stripe from "stripe";
import { getPlanById } from "../../../models/plan";
import { getUserById } from "../../../models/user";
import Company from "../../../models/company";
const stripe = new Stripe(
  "sk_test_51OiQTMCNny1QRAVkc5n0YxOQqiHlPI1Ev2qrgPa0lsK3Xw0cs4r0tpwcS6XKbNfajzo5APTUGCCyrXAXm8AZJ9DI003kGTKJvr"
);

const confirmPaymentHandler = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    const company = companies[0];
    if (!company) return res.status(404).send({ error: "No company found" });

    const user = await getUserById(req.user._id.toString());
    if (!user) return res.status(404).send({ error: "No user found" });

    if (user.stripePaymentIntent.clientSecret !== req.body.clientSecret)
      return res
        .status(404)
        .send({ error: "Unauthorized access: clientSecret" });

    if (user.stripePaymentIntent.paymentIntent !== req.body.paymentIntent)
      return res
        .status(404)
        .send({ error: "Unauthorized access: paymentIntent" });

    const paymentIntent = await stripe.paymentIntents.retrieve(
      user.stripePaymentIntent.paymentIntent
    );

    if (paymentIntent.status !== "succeeded")
      return res.status(400).send({ error: paymentIntent.status });

    const plan = await getPlanById(user.stripePaymentIntent.planId);
    if (!plan) return res.status(404).send({ error: "Plan not found" });

    const calAnnualDiscountPrice = (amount: number, percent: number) => {
      const percentDiscount = percent / 100;
      const disCountAmount = percentDiscount * amount;
      const price = amount - disCountAmount;
      return price;
    };

    const finalAmount =
      user.stripePaymentIntent.planDuration === "monthly"
        ? plan?.pricePerMonth
        : calAnnualDiscountPrice(
            plan?.pricePerMonth || 0,
            company?.annualDiscountPlan || 0
          ) * 12;

    user.planId = user.stripePaymentIntent.planId;
    const planExpiry =
      user.stripePaymentIntent.planDuration === "annual"
        ? 31556952000
        : 2629800000;
    user.subscriptionExpiry = Date.now() + planExpiry;
    user.paymentHistory.push({
      amount: finalAmount,
      planId: plan._id.toString(),
      paymentType: "stripe",
      paymentId: paymentIntent.id,
      paymentDuration: user.stripePaymentIntent.planDuration,
      createdAt: new Date(),
    });
    user.stripePaymentIntent = undefined;
    await user.save();

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default confirmPaymentHandler;
