import AdminModel from "../models/AdminModel.js";

export const verifyAdmin = async (req, res, next) => {
  if (!req.session.adminId) {
    return res
      .status(401)
      .json({ message: "Anda Harus Login Terlebih Dahulu" });
  }
  const admin = await AdminModel.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin)
    return res.status(404).josn({ message: "Admin tidak di temukan" });
  req.adminId = admin.id;
  next();
};
