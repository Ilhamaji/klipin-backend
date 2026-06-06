import { registerUser, loginUser, cekUserById, getUserProfile } from "../services/auth.service.js";
import { validationResult } from "express-validator";

// Register Controller
const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationError = validationResult(req);

    if (!username || !password) {
      return res.status(400).json({
        error: true,
        message: "Username dan password harus diisi!",
      });
    }

    if (!validationError.isEmpty()) {
      return res.status(400).json({
        error: true,
        data: validationError.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    const newUser = await registerUser(username, password);

    return res.status(201).json({
      error: false,
      message: "User berhasil didaftarkan",
      data: newUser,
    });
  } catch (error) {
    if (error.message === "Username sudah ada!") {
      return res.status(409).json({
        error: true,
        message: error.message,
      });
    }

    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    // ambil username dan pw
    const { username, password } = req.body;

    // cek usn dan pw
    if (!username || !password) {
      return res.status(400).json({
        error: true,
        message: "Username atau password harus di isi!",
      });
    }

    const login = await loginUser(username, password);

    return res.status(200).json({
      error: false,
      message: "Berhasil login!",
      data: login,
    });
  } catch (error) {
    const status = error.message.includes("tidak cocok") ? 401 : 500;
    return res.status(status).json({
      error: true,
      message: error.message || "Terjadi kesalahan saat login",
    });
  }
};

const getUserProfileController = async (req, res) => {
  try {
    const { userId } = req.user;

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const data = await getUserProfile(userId);
    if (!data) {
      return res.status(404).json({
        error: true,
        message: "Data user tidak ditemukan!",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Data user berhasil ditemkan!",
      data: {
        userId: data.user_id,
        username: data.username,
        createdAt: data.created_at,
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

export { registerController, loginController, getUserProfileController };
