import express from "express";

import {
  getPeserta,
  getPesertaById,
  createPeserta,
  updatePeserta,
  deletePeserta,
} from "../controllers/PesertaController.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const PesertaRouter = express.Router();

PesertaRouter.get("/peserta", getPeserta);
PesertaRouter.get("/peserta/:id", getPesertaById);
PesertaRouter.post("/peserta", verifyAdmin, createPeserta);
PesertaRouter.patch("/peserta/:id", verifyAdmin, updatePeserta);
PesertaRouter.delete("/peserta/:id", verifyAdmin, deletePeserta);

export default PesertaRouter;
