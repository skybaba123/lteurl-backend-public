import Link from "../../models/link";
import Click from "../../models/click";

const expireLinkByDuration = async () => {
  try {
    const durationLinks = await Link.find({
      status: "active",
      scheduled: true,
      scheduleType: "duration",
      expiryDate: { $lte: Date.now(), $gt: 0 },
    });

    if (durationLinks.length <= 0) return console.log("No expired links");
    const durationLinksId = durationLinks.map((entry) => entry._id.toString());

    const durationLinksExp = await Link.updateMany(
      {
        status: "active",
        scheduled: true,
        scheduleType: "duration",
        expiryDate: { $lte: Date.now(), $gt: 0 },
      },
      {
        status: "expired",
        scheduled: false,
        expiryDate: 0,
        maxClicks: 0,
      }
    );

    const linksClicksExp = await Click.updateMany(
      { linkId: { $in: durationLinksId }, status: "active" },
      { status: "expired" }
    );

    console.log(linksClicksExp);
    console.log(durationLinksExp);
  } catch (error) {
    return console.log(error.message);
  }
};

export default expireLinkByDuration;
