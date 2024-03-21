import { getAllPlans, getFreePlan } from "../../models/plan";

const getAllPlanHandler = async (req: any, res: any) => {
  try {
    await getFreePlan();

    const plans = await getAllPlans();
    return res.status(200).send(plans);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllPlanHandler;
