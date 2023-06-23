import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import KegiatanModel from "./KegiatanModel.js";
import PesertaModel from "./PesertaModel.js";

const { DataTypes } = Sequelize;

const AbsensModel = db.define("absensi", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  IDPeserta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PesertaModel,
      key: "id",
    },
  },
  KeyKegiatan: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: KegiatanModel,
      key: "kegiatanKey",
    },
  },
  StatusAbsen: {
    type: DataTypes.ENUM("sudah absen", "belum absen"),
    allowNull: false,
    defaultValue: "belum absen",
  },
});

export default AbsensModel;

(async () => {
  await db.sync();
})();
