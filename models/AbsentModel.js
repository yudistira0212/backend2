import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import KegiatanModel from "./KegiatanModel.js";
import PesertaModel from "./PesertaModel.js";

const { DataTypes } = Sequelize;

const AbsensModel = db.define("absensi", {
  idPeserta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PesertaModel,
      key: "id",
    },
  },
  kegiatanKey: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: KegiatanModel,
      key: "kegiatanKey",
    },
  },
  statusAbsen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default AbsensModel;
