import express from "express";
import {
  getAbsent,
  absen,
  getByidSudahAbsent,
  getDataByKegiatanKey,
  deleteAbsentByIdAndKey,
} from "../controllers/AbsensiConroller.js";

const absentRouter = express.Router();

absentRouter.get("/absent", getAbsent);
absentRouter.get("/absent/kegiatan/:kegiatanKey", getDataByKegiatanKey);
absentRouter.get("/absent/peserta/:id", getByidSudahAbsent);
absentRouter.post("/absent", absen);
absentRouter.delete("/absent/kegiatan/:id/:key", deleteAbsentByIdAndKey);

export default absentRouter;
