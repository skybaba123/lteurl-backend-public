import { getUserById, getUserByUsername } from "../../models/user";

const updatePersonalDetailsHandler = async (req: any, res: any) => {
  try {
    const user = await getUserById(req.user._id);
    if (!user) return res.status(404).send({ error: "No user found" });

    const isUsernameExist = await getUserByUsername(req.body.username);
    if (isUsernameExist && user.username !== isUsernameExist.username)
      return res.status(400).send({ error: "Username already exist" });

    user.name = req.body.name;
    user.email = req.body.email;
    user.username = req.body.username;

    const updatedUser = await user.save();

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updatePersonalDetailsHandler;
