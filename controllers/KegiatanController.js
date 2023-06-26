import KegiatanModel from "../models/KegiatanModel.js";
import AbsensModel from "../models/AbsentModel.js";

export const getKegiatan = async (req, res) => {
  try {
    const response = await KegiatanModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

export const getKegiatanById = async (req, res) => {
  try {
    const response = await KegiatanModel.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const createKegiatan = async (req, res) => {
  try {
    await KegiatanModel.create(req.body);
    res.status(201).json({ massage: "user created" });
  } catch (error) {
    console.log(error.massage);
  }
};

export const updateKegiatan = async (req, res) => {
  try {
    const response = await KegiatanModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const deleteKegiatan = async (req, res) => {
  try {
    const kegiatanKey = req.params.kegiatanKey;

    // Hapus data kegiatan
    await AbsensModel.destroy({ where: { KeyKegiatan: kegiatanKey } });

    // Hapus data absen yang memiliki key kegiatan yang sama
    await KegiatanModel.destroy({ where: { kegiatanKey } });

    res.json({ message: "Data kegiatan dan absen berhasil dihapus" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam menghapus data" });
  }
};
