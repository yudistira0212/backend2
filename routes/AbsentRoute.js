import express from "express";
import {
  getAbsent,
  absen,
  getByidSudahAbsent,
  getDataByKegiatanKey,
  deleteAbsentKegiatanBykey,
  deleteAbsentPesertaById,
} from "../controllers/AbsensiConroller.js";

const absentRouter = express.Router();

absentRouter.get("/absent", getAbsent);
absentRouter.get("/absent/kegiatan/:kegiatanKey", getDataByKegiatanKey);
absentRouter.get("/absent/peserta/:id", getByidSudahAbsent);
absentRouter.post("/absent", absen);
absentRouter.delete("/absent/kegiatan/:key", deleteAbsentKegiatanBykey);
absentRouter.delete("/absent/kegiatan/:id", deleteAbsentPesertaById);

export default absentRouter;
