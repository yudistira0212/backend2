import AdminModel from "../models/AdminModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  const { password } = req.body;
  const admin = await AdminModel.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin) return res.status(404).json({ message: "akun tidak tersedia" });
  const match = await argon2.verify(admin.password, password);
  if (!match) return res.status(400).json({ message: "Password Salah" });
  req.session.adminId = admin.uuid;
  const uuid = admin.uuid;
  const name = admin.name;
  const email = admin.email;
  res.status(200).json({ uuid, name, email });
};

export const me = async (req, res) => {
  if (!req.session.adminId) {
    return res
      .status(401)
      .json({ message: "Anda Harus Login Terlebih Dahulu" });
  }
  const admin = await AdminModel.findOne({
    attributes: ["uuid", "name", "email"],
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin)
    return res.status(404).json({ message: "admin tidak deitemukan" });
  res.status(200).json(admin);
};

export const logOut = (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ message: "Tidak bisa LogOut" });
    res.status(200).json({ message: "Andah telah logOut" });
  });
};
