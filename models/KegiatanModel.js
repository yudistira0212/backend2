import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const generateRandomCode = () => {
  const randomCode = Math.floor(Math.random() * 10000);
  return randomCode.toString().padStart(4, "0");
};

const KegiatanModel = db.define(
  "kegiatan",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kegiatanKey: {
      type: DataTypes.STRING,
      defaultValue: generateRandomCode,
      unique: true,
      allowNull: false,
    },
    waktum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waktus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default KegiatanModel;

(async () => {
  await db.sync();
})();
