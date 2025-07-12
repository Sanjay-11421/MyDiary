import express from "express";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExists = await UserModel.findOne({ email });

  if (alreadyExists) {
    return res
      .status(400)
      .json({ msg: "User already exists, try logging in " });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel({ name, email, password: hashedPassword });
  user.save();
  res.json({ msg: "Register Successfull" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ msg: "No User Exists, try Creating account " });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ msg: "Wrong Password" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({ token: token });
};
