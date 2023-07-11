import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequeLizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import PesertaRouter from "./routes/PesertaRoute.js";
import KegiatanRouter from "./routes/KegiatanRoute.js";
import AbsentRouter from "./routes/AbsentRoute.js";
import AdminRouter from "./routes/AdminRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequeLizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://presensi.unipa.ac.id:3000",
      "10.10.0.134:3000",
    ],
  })
);

app.use(express.json());
app.use(KegiatanRouter);
app.use(PesertaRouter);
app.use(AbsentRouter);
app.use(AdminRouter);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => console.log("server is runing..."));
