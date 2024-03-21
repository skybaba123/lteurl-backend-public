import { deleteUserById, getUserById } from "../../models/user";
import Click from "../../models/click";
import Link from "../../models/link";

const deleteUserHandler = async (req: any, res: any) => {
  try {
    const requester = req.user;
    const user = await getUserById(req.body.userId);
    if (!user) return res.status(404).send({ error: "No user found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    ) {
      return res.status(400).send({ error: "Unauthorized access" });
    }

    if (user.role === "admin" && requester.manager !== "yes") {
      return res
        .status(400)
        .send({ error: "Only a Manager can delete other Admins" });
    }

    await deleteUserById(req.body.userId);
    await Click.deleteMany({ linkOwnerId: user._id.toString() });
    await Link.deleteMany({ ownerId: user._id.toString() });
    return res.status(200).send({ msg: "User deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteUserHandler;
