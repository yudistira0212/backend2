import express from "express";
import {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/AdminController.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const AdminRouter = express.Router();

AdminRouter.get("/admin", verifyAdmin, getAdmin);
AdminRouter.get("/admin/:id", verifyAdmin, getAdminById);
AdminRouter.post("/admin", verifyAdmin, createAdmin);
AdminRouter.patch("/admin/:id", verifyAdmin, updateAdmin);
AdminRouter.delete("/admin/:id", verifyAdmin, deleteAdmin);

export default AdminRouter;
