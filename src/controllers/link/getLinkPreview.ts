import { getLinkByParamId } from "../../models/link";
import puppeteer from "puppeteer";

const getLinkPreviewHandler = async (req: any, res: any) => {
  try {
    const link = await getLinkByParamId(req.body.paramId);
    if (!link) return res.status(404).send({ error: "Link not available" });

    let pageDetails;
    if (link.shortenMode === "single") {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      await page.goto(link.destinationUrl);

      const screenshot = await page.screenshot({ encoding: "base64" });
      const pageTitle = await page.title();

      let pageDescription;
      if (await page.$('meta[name="description"]')) {
        pageDescription = await page.$eval('meta[name="description"]', (el) =>
          el.getAttribute("content")
        );
      }
      await browser.close();

      pageDetails = {
        pageTitle,
        pageDescription,
        screenshot,
      };
    }

    return res.status(200).send(pageDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getLinkPreviewHandler;
