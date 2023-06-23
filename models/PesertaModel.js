import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PesertaModel = db.define(
  "peserta",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nim: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    umur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: DataTypes.STRING,
    absent: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default PesertaModel;
(async () => {
  await db.sync();
})();
