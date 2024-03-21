import { getLinkById } from "../../models/link";

const updateLinkHandler = async (req: any, res: any) => {
  try {
    const link = (await getLinkById(req.body.id)) as any;

    if (req.user._id.toString() !== link.ownerId && req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    for (const key in req.body) {
      if (key !== "id") {
        link[key] = req.body[key];
      }
    }

    await link.save();

    return res.status(200).send({ msg: "" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateLinkHandler;
