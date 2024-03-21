import { getUserById } from "../../models/user";
import { getUserClicks } from "../../models/click";

const getAllUserClickHandler = async (req: any, res: any) => {
  try {
    const user = await getUserById(req.user._id);
    if (!user) return res.status(404).send({ error: "User not found" });
    const userClicks = await getUserClicks(user._id.toString());

    return res.status(200).send(userClicks.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllUserClickHandler;
