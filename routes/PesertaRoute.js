import express from "express";

import {
  getPeserta,
  getPesertaById,
  createPeserta,
  updatePeserta,
  deletePeserta,
} from "../controllers/PesertaController.js";

const PesertaRouter = express.Router();

PesertaRouter.get("/peserta", getPeserta);
PesertaRouter.get("/peserta/:id", getPesertaById);
PesertaRouter.post("/peserta", createPeserta);
PesertaRouter.patch("/peserta/:id", updatePeserta);
PesertaRouter.delete("/peserta/:id", deletePeserta);

export default PesertaRouter;
