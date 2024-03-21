import { getLinkByParamId } from "../../models/link";
import Click, {
  createClick,
  getClickByIpAdress,
  getLinkClicks,
  getUserClicks,
} from "../../models/click";
import { getUserPlan } from "../../models/plan";
import { getUserById } from "../../models/user";
import getIpInfo from "../../constants/ipInfo";

const createClickHandler = async (req: any, res: any) => {
  try {
    const link = await getLinkByParamId(req.body.paramId);
    if (!link) return res.status(404).send({ error: "Link Not found" });

    if (link.status === "expired")
      return res.status(400).send({ error: "Link not available: Expired" });

    const user = await getUserById(link.ownerId);
    if (!user)
      return res.status(404).send({ error: "This link is now invalid" });

    const userPlan = await getUserPlan(user.planId);
    const userClicks = await getUserClicks(user._id.toString());

    const monthlyClicks = userClicks?.filter((eachClick) => {
      const currntMonth = new Date().toLocaleDateString("en-US", {
        month: "long",
      });
      const clickMonth = new Date(`${eachClick.createdAt}`).toLocaleDateString(
        "en-US",
        { month: "long" }
      );
      return currntMonth === clickMonth;
    });

    if (monthlyClicks.length >= userPlan.clicksPerMonth)
      return res
        .status(400)
        .send({ error: "Owner Exeeded number of click per month" });

    const ipAddress = req.clientIp;
    const exisitingClick = await getClickByIpAdress(ipAddress);

    if (exisitingClick) {
      const newExistClick = {
        linkId: link._id,
        linkOwnerId: user._id,
        ip: exisitingClick.ip,
        location: exisitingClick.location,
        country: exisitingClick.country,
        countryCode: exisitingClick.countryCode,
        countryFlag: exisitingClick.countryFlag,
      };
      await createClick(newExistClick);
    } else {
      const ipInfo = await getIpInfo(ipAddress);
      const newClick = {
        linkId: link._id,
        linkOwnerId: user._id,
        ip: ipInfo.ip || "N/A",
        location: ipInfo?.loc || "N/A",
        country: ipInfo?.country || "N/A",
        countryCode: ipInfo?.countryCode || "N/A",
        countryFlag: ipInfo?.countryFlag?.emoji || "N/A",
      };
      await createClick(newClick);
    }

    if (link.scheduled) {
      if (link.scheduleType === "clicks") {
        const numOflinkClicks = (
          await getLinkClicks(link._id.toString())
        ).filter((entry) => entry.status === "active").length;

        if (link.maxClicks > 0 && numOflinkClicks >= link.maxClicks) {
          link.status = "expired";
          link.scheduled = false;
          link.expiryDate = 0;
          link.maxClicks = 0;
          await link.save();
          await Click.updateMany({ linkId: link._id }, { status: "expired" });
        }
      }
    }

    return res.status(200).send(link);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createClickHandler;
