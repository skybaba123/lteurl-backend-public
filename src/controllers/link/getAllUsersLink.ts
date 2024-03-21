import { getAllUsersLinks } from "../../models/link";

const getAllUsersLinksHandler = async (req: any, res: any) => {
  try {
    const userLinks = await getAllUsersLinks(req.user._id);
    res.status(200).send(userLinks.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllUsersLinksHandler;
