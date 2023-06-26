import express from "express";
import {
  getKegiatan,
  getKegiatanById,
  updateKegiatan,
  deleteKegiatan,
  createKegiatan,
} from "../controllers/KegiatanController.js";

const KegiatanRouter = express.Router();

KegiatanRouter.get("/kegiatan", getKegiatan);
KegiatanRouter.get("/kegiatan/:id", getKegiatanById);
KegiatanRouter.post("/kegiatan", createKegiatan);
KegiatanRouter.patch("/kegiatan/:id", updateKegiatan);
KegiatanRouter.delete("/kegiatan/:kegiatanKey", deleteKegiatan);

export default KegiatanRouter;
