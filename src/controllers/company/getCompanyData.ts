import Company from "../../models/company";
import { getUserById } from "../../models/user";

const getCompanyDataHandler = async (req: any, res: any) => {
  try {
    const user = await getUserById(req.body.userId);
    let initCompany;
    const companies = await Company.find({});
    if (companies.length <= 0) {
      const newCompany = await new Company({}).save();
      initCompany = newCompany;
    } else {
      initCompany = companies[0];
    }

    initCompany.emailSetup =
      user?.role === "admin" ? initCompany.emailSetup : undefined;

    return res.status(200).send(initCompany);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getCompanyDataHandler;
