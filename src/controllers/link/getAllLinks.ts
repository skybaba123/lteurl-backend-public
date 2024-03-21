import { getAllLinks } from "../../models/link";

const getAllLinksHandler = async (req: any, res: any) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    const links = await getAllLinks();
    return res.status(200).send(links.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllLinksHandler;
