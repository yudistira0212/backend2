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
  try {
    const { KeyKegiatan, IDPeserta } = req.body;

    const absensi = await AbsentModel.findOne({
      where: { IDPeserta, KeyKegiatan },
    });

    console.log(absensi);
    if (absensi) {
      return res
        .status(400)
        .json({ error: "Anda telah melakukan absen untuk kegiatan ini." });
    }

    await AbsentModel.create({
      IDPeserta,
      KeyKegiatan,

      StatusAbsen: "sudah absen",
    });

    res.status(200).json({ message: "Absen berhasil dilakukan." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Key absent tidak tersedia" });
  }
};

export const getDataByKegiatanKey = async (req, res) => {
  try {
    const kegiatanKey = req.params.kegiatanKey;

    const absenList = await AbsentModel.findAll({
      where: { KeyKegiatan: kegiatanKey },
    });
    const kegiatan = await KegiatanModel.findOne({
      where: { kegiatanKey: kegiatanKey },
    });

    const pesertaList = await PesertaModel.findAll();

    if (pesertaList.length === 0) {
      return res.status(404).json({ message: "Tidak ada data peserta" });
    }
    const pesertaIds = absenList.map((absen) => absen.IDPeserta);

    const pesertaData = pesertaList.map((peserta) => {
      const isAbsen = pesertaIds.includes(peserta.id);
      const statusAbsen = isAbsen ? "sudah absen" : "belum absen";
      return { ...peserta.toJSON(), statusAbsen };
    });

    console.table({ kegiatan });
    console.table({ pesertaData });

    res.json({ pesertaData, kegiatan });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam mengambil data" });
  }
};

export const getByidSudahAbsent = async (req, res) => {
  try {
    const id = req.params.id;

    const absenList = await AbsentModel.findAll({
      where: { IDPeserta: id },
    });

    const peserta = await PesertaModel.findOne({
      where: { id: id },
    });

    const kegiatanKey = absenList.map((absen) => absen.KeyKegiatan);

    const kegiatanList = await KegiatanModel.findAll();

    if (kegiatanList.length === 0) {
      return res.status(404).json({ message: "Tidak ada data kegiatan" });
    }

    const keigatanData = kegiatanList.map((kegiatan) => {
      const isAbsen = kegiatanKey.includes(kegiatan.kegiatanKey);
      const statusAbsen = isAbsen ? "sudah absen" : "belum absen";
      return { ...kegiatan.toJSON(), statusAbsen };
    });

    res.json({ keigatanData, peserta });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam mengambil data" });
  }
};
