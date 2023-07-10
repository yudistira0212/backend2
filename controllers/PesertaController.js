import PesertaModel from "../models/PesertaModel.js";
import AbsensModel from "../models/AbsentModel.js";

export const getPeserta = async (req, res) => {
  try {
    const response = await PesertaModel.findAll({
      attributes: ["uuid", "name", "nim", "fakultas", "jurusan", "gender"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPesertaById = async (req, res) => {
  try {
    const peserta = await PesertaModel.findOne({
      attributes: ["uuid", "name", "nim", "fakultas", "jurusan", "gender"],
      where: { uuid: req.params.id },
    });
    if (!peserta)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(peserta);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const createPeserta = async (req, res) => {
  const { name, nim, fakultas, jurusan, gender } = req.body;
  try {
    await PesertaModel.create({
      name: name,
      nim: nim,
      fakultas: fakultas,
      jurusan: jurusan,
      gender: gender,
    });
    res.status(201).json({ massage: "Peserta Di tambahkan" });
  } catch (error) {
    console.log(error.massage);
  }
};

export const updatePeserta = async (req, res) => {
  try {
    await PesertaModel.update(req.body, {
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ massage: "Peserta Di update" });
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
};

export const deletePeserta = async (req, res) => {
  const peserta = await PesertaModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  try {
    await AbsensModel.destroy({ where: { idPeserta: peserta.id } });
    await PesertaModel.destroy({ where: { id: peserta.id } });

    res.json({ message: "Data peserta dan absen berhasil dihapus" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam menghapus data" });
  }
};
