import AbsentModel from "../models/AbsentModel.js";
import KegiatanModel from "../models/KegiatanModel.js";
import PesertaModel from "../models/PesertaModel.js";

export const getAbsent = async (req, res) => {
  try {
    const response = await AbsentModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

export const absen = async (req, res) => {
  const { key, id } = req.body;

  const peserta = await PesertaModel.findOne({
    where: {
      uuid: id,
    },
  });

  if (!peserta) res.status(404).json({ error: "peserta tidak ditemukan" });

  const absensi = await AbsentModel.findOne({
    where: { idPeserta: peserta.id, kegiatanKey: key },
  });

  try {
    if (absensi) {
      return res
        .status(400)
        .json({ error: "Anda telah melakukan absen untuk kegiatan ini" });
    }
    await AbsentModel.create({
      idPeserta: peserta.id,
      kegiatanKey: key,
      statusAbsen: "Sudah Absen",
    });

    res.status(200).json({ message: "Absen berhasil dilakukan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Key absent tidak tersedia" });
  }
};

export const getDataByKegiatanKey = async (req, res) => {
  try {
    const kegiatanKey = req.params.key;

    const kegiatan = await KegiatanModel.findOne({
      where: { kegiatanKey: kegiatanKey },
    });

    if (!kegiatan) {
      return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
    }

    const absenList = await AbsentModel.findAll({
      where: { kegiatanKey: kegiatanKey },
    });

    const pesertaList = await PesertaModel.findAll();

    if (pesertaList.length === 0) {
      return res.status(404).json({ message: "Tidak ada data peserta" });
    }
    const pesertaIds = absenList.map((absen) => absen.idPeserta);

    const pesertaData = pesertaList.map((peserta) => {
      const isAbsen = pesertaIds.includes(peserta.id);
      const statusAbsen = isAbsen ? "Sudah Absen" : "Belum Absen";
      return { ...peserta.toJSON(), statusAbsen };
    });

    res.json({ kegiatan, pesertaData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam mengambil data" });
  }
};

export const getByNimSudahAbsent = async (req, res) => {
  try {
    const nim = req.params.nim;

    const peserta = await PesertaModel.findOne({
      where: { nim: nim },
    });

    if (!peserta) {
      return res
        .status(404)
        .json({ message: "Data dengan nim tersebut tidak tersedia" });
    }

    const absenList = await AbsentModel.findAll({
      where: { idPeserta: peserta.id },
    });
    if (!absenList) {
      return res.status(404).json({ message: "Tidak ada data absent" });
    }

    const kegiatanKey = absenList.map((absen) => absen.kegiatanKey);

    const kegiatanList = await KegiatanModel.findAll();

    if (kegiatanList.length === 0) {
      return res.status(404).json({ message: "Tidak ada data kegiatan" });
    }

    const keigatanData = kegiatanList.map((kegiatan) => {
      const isAbsen = kegiatanKey.includes(kegiatan.kegiatanKey);
      const statusAbsen = isAbsen ? "Sudah Absen" : "Belum Absen";
      return { ...kegiatan.toJSON(), statusAbsen };
    });

    res.json({ keigatanData, peserta });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "data tidak tersedia" });
  }
};

export const deleteAbsentByIdAndKey = async (req, res) => {
  const { id, key } = req.params;

  const peserta = await PesertaModel.findOne({
    where: {
      uuid: id,
    },
  });

  if (!peserta)
    return res.status(404).json({ message: "Data peserta tidak tersedia" });

  try {
    await AbsentModel.destroy({
      where: { idPeserta: peserta.id, kegiatanKey: key },
    });

    res.json({ message: "Data absent berhasi di hapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan dalam menghapus data" });
  }
};
