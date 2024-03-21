import { nanoid } from "nanoid";
import {
  createLink,
  getLinkByParamId,
  getAllUsersLinks,
} from "../../models/link";
import { getUserPlan } from "../../models/plan";

const createLinkHandler = async (req: any, res: any) => {
  try {
    const paramId = nanoid(6);
    const checkParamOne = await getLinkByParamId(paramId);
    const checkParamTwo = await getLinkByParamId(req.body.paramId);

    if (checkParamOne || checkParamTwo) {
      return res.status(400).send({
        error:
          "Something went wrong with the params: Try again with a different custom id or leave the custom id field empty for the sytem to generate a random ID",
      });
    }

    const userLinks = await getAllUsersLinks(req.user._id.toString());
    const userGroupLinks = userLinks.filter(
      (eachLink) => eachLink.shortenMode === "group"
    );

    const userPlan = await getUserPlan(req.user.planId);

    if (userLinks.length >= userPlan.maxShortenLinks)
      return res.status(400).send({ error: "Owner Exeeded number of Links" });

    if (
      req.body.shortenMode === "group" &&
      userGroupLinks.length >= userPlan.maxGroupLinks
    )
      return res
        .status(400)
        .send({ error: "Owner Exeeded number of Group Links" });

    const newLink = {
      label: req.body.label.trim() === "" ? paramId : req.body.label,
      paramId: req.body.paramId.trim() === "" ? paramId : req.body.paramId,
      destinationUrl: req.body.destinationUrl,
      shortenMode: req.body.shortenMode,
      password: req.body.password.trim() === "" ? "12345" : req.body.password,
      passProtected: req.body.passProtected,
      ownerId: req.user._id,
      metaTitle:
        req.body.metaTitle.trim() === "" ? "Link Shortner" : req.body.metaTitle,
      metaDescription:
        req.body.metaDescription.trim() === ""
          ? "Link Shortner"
          : req.body.metaDescription,
    };

    const savedLink = await createLink(newLink);
    return res.status(200).send(savedLink);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createLinkHandler;
