import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getAllUsers } from "../../models/user";
import { getFreePlan } from "../../models/plan";
import Company from "../../models/company";
import sendEmail from "../../constants/sendEmail";
import { render } from "@react-email/render";
import WelcomeEmail from "../../email/WelcomeEmail";

const registerController = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    const company = companies[0];
    if (!company) return res.status(404).send({ error: "No company info" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const freePlan = await getFreePlan();

    const userExistByEmail = await getUserByEmail(req.body.email);
    if (userExistByEmail)
      return res
        .status(404)
        .send({ error: "User already exists with this email. Login instead" });

    const allUsers = await getAllUsers();

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      username: "",
      hashedPassword,
      planId: freePlan._id,
      manager: allUsers.length <= 0 ? "yes" : "no",
    };
    const savedUser = await createUser(newUser);

    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRETE, {
      expiresIn: "30 days",
    });
    savedUser.sessionToken = token;
    await savedUser.save();

    if (company.welcomeEmail.status === "on") {
      const htmlEmail = render(
        WelcomeEmail({ userFirstname: savedUser.name, company })
      );

      await sendEmail(
        savedUser.email,
        "Welcome",
        company.welcomeEmail.emailMessage,
        htmlEmail,
        company
      );
    }

    res.status(200).send(savedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default registerController;
