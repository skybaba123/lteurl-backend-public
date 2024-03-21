import { getUserById } from "../../models/user";

const getUserByIdHandler = async (req: any, res: any) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    const user = await getUserById(req.body.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getUserByIdHandler;
