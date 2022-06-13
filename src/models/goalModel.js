const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // PROFILE PRIA
    // required: [true, "Please add a photoCowo"]
    photoCowo: { type: String },
    idCloudPhotoCowo: {type: String},
    namaLkpCowo: { type: String, required: [true, "Please add a namaLkpCowo"] },
    namaPglCowo: { type: String, required: [true, "Please add a namaPglCowo"] },
    namaAyahCowo: {
      type: String,
      required: [true, "Please add a namaAyahCowo"],
    },
    namaIbuCowo: { type: String, required: [true, "Please add a namaIbuCowo"] },
    urutanAnakCowo: {
      type: String,
      required: [true, "Please add a urutanAnakCowo"],
    },
    linkIGCowo: { type: String, required: [true, "Please add a linkIGCowo"] },
    linkFBCowo: { type: String, required: [true, "Please add a linkFBCowo"] },

    // PROFILE WANITA
    photoCewe: { type: String },
    idCloudPhotoCewe: {type: String},
    namaLkpCewe: { type: String, required: [true, "Please add a namaLkpCewe"] },
    namaPglCewe: { type: String, required: [true, "Please add a namaPglCewe"] },
    namaAyahCewe: {
      type: String,
      required: [true, "Please add a namaAyahCewe"],
    },
    namaIbuCewe: { type: String, required: [true, "Please add a namaIbuCewe"] },
    urutanAnakCewe: {
      type: String,
      required: [true, "Please add a urutanAnakCewe"],
    },
    linkIGCewe: { type: String, required: [true, "Please add a linkIGCewe"] },
    linkFBCewe: { type: String, required: [true, "Please add a linkFBCewe"] },

    // WAKTU DAN TEMPAT AKAD
    tglAkad: { type: String, required: [true, "Please add a tglAkad"] },
    waktuAkad: { type: String, required: [true, "Please add a waktuAkad"] },
    alamatAkad: { type: String, required: [true, "Please add a alamatAkad"] },
    linkAlmtAkad: {
      type: String,
      required: [true, "Please add a linkAlmtAkad"],
    },

    // WAKTU DAN TEMPAT RESEPSI
    tglResepsi: { type: String, required: [true, "Please add a tglResepsi"] },
    waktuResepsi: {
      type: String,
      required: [true, "Please add a waktuResepsi"],
    },
    alamatResepsi: {
      type: String,
      required: [true, "Please add a alamatResepsi"],
    },
    linkAlmtResepsi: {
      type: String,
      required: [true, "Please add a linkAlmtResepsi"],
    },

    //DOMPET DIGITAL
    namaBank: { type: String, required: [true, "Please add a namaBank"] },
    noRek: { type: String, required: [true, "Please add a noRek"] },
    atasNamaBank: {
      type: String,
      required: [true, "Please add a atasNamaBank"],
    },
    namaDompet: { type: String, required: [true, "Please add a namaDompet"] },
    noHp: { type: String, required: [true, "Please add a noHp"] },
    atasNamaDompet: {
      type: String,
      required: [true, "Please add a atasNamaDompet"],
    },

    //GALERI
    idYT: { type: String },
    linkLive: { type: String, required: [true, "Please add a linkLive"] },
    photoBerdua: { type: String },
    idCloudPhotoBerdua: {type: String},
    music: { type: String },
    idCloudMusic: {type: String},
    files: [Object],
    comments: [
      {
        nameComment: { type: String },
        isiComment: { type: String },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
