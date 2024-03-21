import Company from "../../models/company";
import sendEmail from "../../constants/sendEmail";
import { getUserByEmail } from "../../models/user";
import bcrypt from "bcrypt";
import formatDate from "../../constants/formatDate";
import { render } from "@react-email/render";
import PasswordUpdated from "../../email/PasswordUpdated";

const newPasswordHandler = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    const company = companies[0];
    if (!company) return res.status(404).send({ error: "No user found" });

    const user = await getUserByEmail(req.body.email);
    if (!user) return res.status(404).send({ error: "No user found" });

    if (!user.verificationCode || !user.verificationCodeExpiry)
      return res.status(400).send({ error: "Unauthorized access code-N/A" });

    if (user.verificationCode !== req.body.otp)
      return res.status(400).send({ error: "Invalid otp code" });

    if (Date.now() > user.verificationCodeExpiry)
      return res.status(400).send({ error: "The code you entered is expired" });

    const salt = bcrypt.genSaltSync(10);
    const newhashedPassword = bcrypt.hashSync(req.body.newPassword, salt);

    user.hashedPassword = newhashedPassword;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await user.save();

    const emailText = `You updated the password for your ${
      company.name
    } account on
    ${formatDate(new Date())}.`;

    const emailHtml = render(
      PasswordUpdated({ username: user.name, updatedDate: new Date(), company })
    );

    await sendEmail(
      user.email,
      "Password Changed",
      emailText,
      emailHtml,
      company
    );

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default newPasswordHandler;
