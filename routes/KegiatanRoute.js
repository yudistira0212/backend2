import express from "express";
import {
  getKegiatan,
  getKegiatanById,
  updateKegiatan,
  deleteKegiatan,
  createKegiatan,
  statusUpdate,
} from "../controllers/KegiatanController.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const KegiatanRouter = express.Router();

KegiatanRouter.get("/kegiatan", getKegiatan);
KegiatanRouter.get("/kegiatan/:id", getKegiatanById);
KegiatanRouter.post("/kegiatan", verifyAdmin, createKegiatan);
KegiatanRouter.patch("/kegiatan/:id", verifyAdmin, updateKegiatan);
KegiatanRouter.patch("/kegiatan/status/:id", verifyAdmin, statusUpdate);
KegiatanRouter.delete("/kegiatan/:key", verifyAdmin, deleteKegiatan);

export default KegiatanRouter;
