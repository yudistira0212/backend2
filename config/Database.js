import { Sequelize } from "sequelize";

const db = new Sequelize("datapresnsi", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
