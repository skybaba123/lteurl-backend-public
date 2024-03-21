import { deletePlanById } from "../../models/plan";

const deletePlanHandler = async (req: any, res: any) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    await deletePlanById(req.body.planId);
    return res.status(200).send({ msg: "Plan deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deletePlanHandler;
