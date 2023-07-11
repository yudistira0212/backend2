import { Sequelize } from "sequelize";

const db = new Sequelize("datapresnsi", "presensi", "K0p1jand@", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
