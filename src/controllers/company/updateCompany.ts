import Company from "../../models/company";

const updateCompanyHandler = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    if (companies.length <= 0)
      return res.status(404).send({ error: "No company data found" });

    const company = companies[0] as any;

    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    for (const key in req.body) {
      company[key] = req.body[key];
    }

    await company.save();

    return res.status(200).send({ msg: "Updated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateCompanyHandler;
