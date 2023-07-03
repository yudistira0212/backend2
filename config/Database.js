import { Sequelize } from "sequelize";

const db = new Sequelize("absensi", "root", "", {
  host: "192.168.1.2",
  dialect: "mysql",
});

export default db;
