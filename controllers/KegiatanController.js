import KegiatanModel from "../models/KegiatanModel.js";
import AbsensModel from "../models/AbsentModel.js";

export const getKegiatan = async (req, res) => {
  try {
    const response = await KegiatanModel.findAll({
      attributes: ["uuid", "name", "kegiatanKey", "waktum", "waktus", "status"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

export const getKegiatanById = async (req, res) => {
  try {
    const kegiatan = await KegiatanModel.findOne({
      attributes: ["uuid", "name", "kegiatanKey", "waktum", "waktus", "status"],
      where: { uuid: req.params.id },
    });
    if (!kegiatan)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(kegiatan);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const createKegiatan = async (req, res) => {
  const { name, waktum, waktus } = req.body;
  try {
    await KegiatanModel.create({
      name: name,
      waktum: waktum,
      waktus: waktus,
    });
    res.status(201).json({ massage: "kegiatan ditambahkan" });
  } catch (error) {
    console.log(error.massage);
  }
};

export const updateKegiatan = async (req, res) => {
  try {
    await KegiatanModel.update(req.body, {
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ massage: "Kegiatan Di update" });
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const deleteKegiatan = async (req, res) => {
  const key = req.params.key;
  try {
    await AbsensModel.destroy({ where: { kegiatanKey: key } });

    await KegiatanModel.destroy({ where: { kegiatanKey: key } });

    res.json({ message: "Data kegiatan dan absen berhasil dihapus" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam menghapus data" });
  }
};

export const statusUpdate = async (req, res) => {
  const id = req.params.id;
  const kegiatan = await KegiatanModel.findOne({
    where: {
      uuid: id,
    },
  });

  if (!kegiatan) {
    return res.status(404).json({
      message: "data tidak tersedia tersedia",
    });
  }

  try {
    if (kegiatan.status === 1) {
      await KegiatanModel.update(
        {
          status: 0,
        },
        {
          where: {
            uuid: id,
          },
        }
      );
      res.status(200).json({ message: "status tidak aktif" });
    } else {
      await KegiatanModel.update(
        {
          status: 1,
        },
        {
          where: {
            uuid: id,
          },
        }
      );
      res.status(200).json({ message: "status aktif" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengupdate data" });
  }
};
