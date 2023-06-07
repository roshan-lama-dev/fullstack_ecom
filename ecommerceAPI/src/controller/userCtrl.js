import { User } from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const email = req.body.email;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      //create a new user
      const newUser = User.create(req.body);
      res.json(newUser);
    } else {
      res.json({
        msg: "User Already exits",
        success: "false",
      });
      // user already exists
    }
  } catch (error) {
    console.log(error);
  }
};
