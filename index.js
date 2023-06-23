import express from "express";
import cors from "cors";
import PesertaRouter from "./routes/PesertaRoute.js";
import KegiatanRouter from "./routes/KegiatanRoute.js";
import absentRouter from "./routes/AbsentRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(KegiatanRouter);
app.use(PesertaRouter);
app.use(absentRouter);

app.listen(4000, () => console.log("server is runing at port 4000..."));
