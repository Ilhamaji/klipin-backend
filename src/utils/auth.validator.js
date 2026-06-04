import { body } from "express-validator";

export const registerValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter")
    .matches(/[A-Z]/)
    .withMessage("Password harus mengandung minimal 1 huruf besar")
    .matches(/[a-z]/)
    .withMessage("Password harus mengandung minimal 1 huruf kecil")
    .matches(/[0-9]/)
    .withMessage("Password harus mengandung minimal 1 angka"),
];
