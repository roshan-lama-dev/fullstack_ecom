import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";

export const authMiddleware = asynchandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        //send the token that comes after logging in from the user in the header section
        // get the token from the header and then use that to verify the token with the secert key stored in the env file.
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // how do we get the  id in the decode token??
        console.log(decode);
        // use the id that is in the token to find the user by id
        // then forward the user infromation to next router as a req,
        const user = await userModel.findById(decode?.id);
        (req.user = user), next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please login again");
    }
  } else {
    throw new Error(" There is no token attached to the header");
  }
});

export const isAdmin = asynchandler(async (req, res, next) => {
  //   console.log(req.user);
  const { email } = req.user;

  const adminUser = await userModel.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You dont have admin privlages");
  }
  try {
  } catch (error) {}
});
