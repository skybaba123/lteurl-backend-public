import { deleteLinkById, getLinkById } from "../../models/link";
import Click from "../../models/click";

const deleteLinkHandler = async (req: any, res: any) => {
  try {
    const link = await getLinkById(req.body.id);
    if (!link) return res.status(404).send({ error: "Link not found" });

    if (req.user._id.toString() !== link.ownerId || req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    await deleteLinkById(link._id.toString());
    await Click.deleteMany({ linkId: link._id });
    return res.status(200).send({ msg: "Link Deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteLinkHandler;
