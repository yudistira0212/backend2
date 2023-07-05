import { Sequelize } from "sequelize";

const db = new Sequelize("absensi", "presnesi", "K0p1jand@", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
