import { getUserPlan, getFreePlan } from "../../models/plan";
import { getUserById } from "../../models/user";

const getUserPlanHandler = async (req: any, res: any) => {
  try {
    const user = await getUserById(req.user._id.toString());
    if (!user) return res.status(404).send({ error: "No user found" });

    const userPlan = await getUserPlan(user.planId.toString());

    if (!userPlan) {
      const freePlan = await getFreePlan();
      user.planId = freePlan._id.toString();
      await user.save();

      const userPlanAlt = await getUserPlan(user.planId.toString());

      return res.status(200).send(userPlanAlt);
    }

    return res.status(200).send(userPlan);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getUserPlanHandler;
