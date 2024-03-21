import { customAlphabet } from "nanoid";
import User, { getUserById } from "../../models/user";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const generateApiHandler = async (req: any, res: any) => {
  try {
    const user = await getUserById(req.user._id);
    if (!user) res.status(404).send({ error: "No user found" });
    const newApiKey = customAlphabet(alphabet, 26)();

    const checkExistingApi = await User.findOne({ apiKey: newApiKey });
    if (checkExistingApi)
      res.status(404).send({ error: "Try to generate again" });

    user.apiKey = newApiKey;
    await user.save();

    return res
      .status(200)
      .send("New Api Key Generated. Any existing api key is now invalid");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default generateApiHandler;
