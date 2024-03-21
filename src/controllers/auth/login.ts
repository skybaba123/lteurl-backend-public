import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail, getUserByUsername } from "../../models/user";

const loginController = async (req: any, res: any) => {
  try {
    let user;
    user = await getUserByEmail(req.body.email);
    if (!user) {
      user = await getUserByUsername(req.body.email);
    }

    if (!user) return res.status(404).send({ error: "No user found" });

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordMatch)
      return res.status(400).send({ error: "Password Mismatch" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "30 days",
    });
    user.sessionToken = token;
    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default loginController;
