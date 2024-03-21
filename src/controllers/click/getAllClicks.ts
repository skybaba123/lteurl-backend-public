import { getAllClicks } from "../../models/click";

const getAllClicksHandler = async (req: any, res: any) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    const clicks = await getAllClicks();
    return res.status(200).send(clicks.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllClicksHandler;
