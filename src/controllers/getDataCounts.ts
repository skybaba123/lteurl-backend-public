import { getAllUsers } from "../models/user";
import { getAllClicks } from "../models/click";
import { getAllLinks } from "../models/link";

const getDataCountHandler = async (req: any, res: any) => {
  try {
    const usersCount = (await getAllUsers()).length;
    const clicksCount = (await getAllClicks()).length;
    const linksCount = (await getAllLinks()).length;

    const allCounts = { usersCount, clicksCount, linksCount };

    return res.status(200).send(allCounts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getDataCountHandler;
