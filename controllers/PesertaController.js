import KegiatanModel from "../models/KegiatanModel.js";
import PesertaModel from "../models/PesertaModel.js";
import AbsensModel from "../models/AbsentModel.js";
export const getPeserta = async (req, res) => {
  try {
    const response = await PesertaModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPesertaById = async (req, res) => {
  try {
    const response = await PesertaModel.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const createPeserta = async (req, res) => {
  try {
    await PesertaModel.create(req.body);
    res.status(201).json({ massage: "user created" });
  } catch (error) {
    console.log(error.massage);
  }
};

export const updatePeserta = async (req, res) => {
  try {
    const response = await PesertaModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const deletePeserta = async (req, res) => {
  try {
    const id = req.params.id;

    await AbsensModel.destroy({ where: { IDPeserta: id } });
    await PesertaModel.destroy({ where: { id: id } });

    res.json({ message: "Data peserta dan absen berhasil dihapus" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam menghapus data" });
  }
};

export const absentPeserta = async (req, res) => {
  const idKegiatan = req.body.idKegiatan;
  const idPeserta = req.body.idPeserta;

  try {
    const kegiatan = await KegiatanModel.findByPk(idKegiatan);
    if (!kegiatan) {
      res.status(404).json({ error: "Kegiatan tidak ditemukan" });
      return;
    }

    const keyKegiatan = kegiatan.kode;

    const peserta = await PesertaModel.findByPk(idPeserta);
    if (!peserta) {
      res.status(404).json({ error: "Peserta tidak ditemukan" });
      return;
    }

    if (peserta.absent !== keyKegiatan) {
      res.status(400).json({ error: "Kode absent tidak sama" });
      return;
    }

    const response = await PesertaModel.update(
      {
        absent: keyKegiatan,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui data peserta" });
  }
};
