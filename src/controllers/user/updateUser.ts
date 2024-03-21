import { getUserById } from "../../models/user";

const updateUserHandler = async (req: any, res: any) => {
  try {
    const user = (await getUserById(req.body.userId)) as any;

    if (
      req.user._id.toString() !== user._id.toString() &&
      req.user.role !== "admin"
    )
      return res.status(400).send({ error: "Unauthorized Access" });

    // if (user.role === "admin" && req.user.manager !== "yes") {
    //   return res
    //     .status(400)
    //     .send({ error: "Only a Manager can update other Admins" });
    // }

    for (const key in req.body) {
      if (key !== "userId") {
        user[key] = req.body[key];
      }
    }

    await user.save();

    return res.status(200).send({ msg: "User updated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateUserHandler;
