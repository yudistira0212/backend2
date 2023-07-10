import AdminModel from "../models/AdminModel.js";
import argon2 from "argon2";

export const getAdmin = async (req, res) => {
  try {
    const response = await AdminModel.findAll({
      attributes: ["uuid", "name", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await AdminModel.findOne({
      attributes: ["uuid", "name", "email"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "password dan confirm password tidak cocok" });
  const hasPassword = await argon2.hash(password);
  try {
    await AdminModel.create({
      name: name,
      email: email,
      password: hasPassword,
    });
    res.status(201).json({ message: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const admin = await AdminModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(400).json({ message: "User tidak di temukan" });
  const { name, email, password, confPassword } = req.body;
  let hasPassword;
  if (password === "" || password === null) {
    hasPassword = admin.password;
  } else {
    hasPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan confirm password tidak sama" });

  try {
    await AdminModel.update({
      name: name,
      email: email,
      password: hasPassword,
    });
    res.status(200).json({ message: "Admin Updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await AdminModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ message: "User tidak ditemukan" });
  try {
    await AdminModel.destroy({
      where: {
        id: admin.id,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
