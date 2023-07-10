import express from "express";
import {
  getAbsent,
  absen,
  getByNimSudahAbsent,
  getDataByKegiatanKey,
  deleteAbsentByIdAndKey,
} from "../controllers/AbsensiConroller.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const AbsentRouter = express.Router();

AbsentRouter.get("/absent", getAbsent);
AbsentRouter.get("/absent/kegiatan/:key", getDataByKegiatanKey);
AbsentRouter.get("/absent/peserta/:nim", getByNimSudahAbsent);
AbsentRouter.post("/absent", absen);
AbsentRouter.delete("/absent/kegiatan/:id/:key", deleteAbsentByIdAndKey);

export default AbsentRouter;
