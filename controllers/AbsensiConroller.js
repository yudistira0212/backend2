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

    // console.log(IDPeserta, KeyKegiatan);
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

    if (absenList.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data absen untuk key kegiatan ini" });
    }

    if (kegiatan.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data kegiatan untuk key kegiatan ini" });
    }
    const pesertaIds = absenList.map((absen) => absen.IDPeserta);

    const pesertaList = await PesertaModel.findAll();

    if (pesertaList.length === 0) {
      return res.status(404).json({ message: "Tidak ada data peserta" });
    }

    const pesertaData = pesertaList.map((peserta) => {
      const isAbsen = pesertaIds.includes(peserta.id);
      const statusAbsen = isAbsen ? "sudah absen" : "belum absen";
      return { ...peserta.toJSON(), statusAbsen };
    });

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
    // console.log(absenList, "rerer");
    if (absenList.length === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada data absen untuk id peserta" });
    }

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

    res.json(keigatanData);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam mengambil data" });
  }
};

// export const absenByUnikKey = async (req, res) => {
//   try {
//     const { KeyKegiatan } = req.body;

//     const absensi = await AbsentModel.findOne({
//       where: { KeyKegiatan },
//     });

//     if (!absensi) {
//       return res.status(404).json({ error: "Kegiatan tidak ditemukan." });
//     }

//     if (absensi.StatusAbsen === "sudah absen") {
//       return res
//         .status(400)
//         .json({ error: "Anda telah melakukan absen untuk kegiatan ini." });
//     }

//     absensi.StatusAbsen = "sudah absen";
//     await absensi.save();

//     res.status(200).json({ message: "Absen berhasil dilakukan." });
//   } catch (error) {
//     res.status(500).json({ error: "Terjadi kesalahan saat melakukan absen." });
//   }
// };
