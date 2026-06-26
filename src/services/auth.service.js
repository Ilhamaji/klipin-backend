import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Service
const registerUser = async (username, password) => {
  // cari usn
  const existingUser = await User.findOne({
    where: { username },
  });

  if (existingUser) {
    throw new Error("Username sudah ada!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // buat user baru
  const newUser = await User.create({
    username,
    password: hashedPassword,
  });

  // kembalikan data user tanpa password
  const { password: _, ...userData } = newUser.dataValues;

  return userData;
};

// Login Service
const loginUser = async (username, password) => {
  // cari usn
  const existingUser = await User.findOne({
    where: { username },
  });

  if (!existingUser) {
    throw new Error("Password atau Username tidak cocok!");
  }

  // cek password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("Password atau Username tidak cocok!");
  }

  // token
  const token = jwt.sign(
    {
      userId: existingUser.user_id,
      username: existingUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    username: existingUser.username,
    token
  };
};

export {
  registerUser,
  loginUser,
  cekUserById,
  getUserProfile
};


// Cek user_id (true or false)
const cekUserById = async (userId) => {
  return await User.count({
    where: { user_id: userId }
  }) > 0;
}

const getUserProfile = async (userId) => {
  return await User.findOne({
    where: { user_id: userId }
  });
}

