import { getPlanById } from "../../models/plan";

const updatePlanHandler = async (req: any, res: any) => {
  try {
    const plan = (await getPlanById(req.body.planId)) as any;

    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    for (const key in req.body) {
      if (key !== "planId") {
        plan[key] = req.body[key];
      }
    }

    await plan.save();
    return res.status(200).send({ msg: "Plan Updated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updatePlanHandler;
