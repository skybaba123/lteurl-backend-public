import { createPlan } from "../../models/plan";

const createPlanHandler = async (req: any, res: any) => {
  try {
    const newPlan = await createPlan(req.body);
    return res.status(200).send(newPlan);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createPlanHandler;
