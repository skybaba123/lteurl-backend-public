import { getUserById } from "../../models/user";
import bcrypt from "bcrypt";

const resetPasswordHandler = async (req: any, res: any) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized access" });

    const user = await getUserById(req.body.userId);
    if (!user) return res.status(404).send({ error: "No user found" });

    const defaultPass = "12345";

    const salt = bcrypt.genSaltSync(10);
    const newhashedPassword = bcrypt.hashSync(defaultPass, salt);

    user.hashedPassword = newhashedPassword;
    await user.save();

    return res.status(200).send({ msg: "Password Reset" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default resetPasswordHandler;
