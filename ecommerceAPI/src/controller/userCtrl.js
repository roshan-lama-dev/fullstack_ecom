import { generateToke } from "../config/jwtToken.js";
import userSchema from "../model/userModel.js";
import asyncHandler from "express-async-handler";

// create new User
export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(email);
  // check if the user exists or not
  const findUser = await userSchema.findOne({ email });
  if (!findUser) {
    //create a new user
    const newUser = await userSchema.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists"); // user already exists
  }
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userSchema.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser._id,
      firtName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToke(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
  console.log(email, password);
});

// get all user
export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await userSchema.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single user
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const getAUser = await userSchema.findById(id);
    res.json({
      getAUser,
    });

    // console.log(id);
  } catch (error) {
    throw new Error(error);
  }
});
// delete a single user
export const deleteSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleteSingleUser = await userSchema.findByIdAndDelete(id);
    res.json({
      deleteSingleUser,
    });

    // console.log(id);
  } catch (error) {
    throw new Error(error);
  }
});

// Update
export const updateUser = asyncHandler(async (req, res) => {
  console.log(req.user);

  try {
    const updateUser = await userSchema.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json({
      updateUser,
    });

    // console.log(id);
  } catch (error) {
    throw new Error(error);
  }
});

export const blockUser = asyncHandler(async (req, res) => {});
export const unblockUser = asyncHandler(async (req, res) => {});
