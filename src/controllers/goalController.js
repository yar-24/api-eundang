const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
// const path = require("path");
// const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

// @desc    Post goals
// @route   POST /api/goals
// @access  Private
const goalPost = asyncHandler(async (req, res) => {
  if (!req.files) {
    const err = new Error("Gambar harus diupload!!");
    err.errorStatus = 422;
    throw err;
  } else {
    try {
      const cloudUpload = await cloudinary.uploader.upload;

      const photoCowo = await cloudUpload(req.files["photoCowo"][0].path);
      const photoCewe = await cloudUpload(req.files["photoCewe"][0].path);
      const photoBerdua = await cloudUpload(req.files["photoBerdua"][0].path);
      const music = await cloudUpload(req.files["music"][0].path, {
        resource_type: "video",
      });

      let filesArray = [];

      for (var i = 0; i < req.files["files"].length; i++) {
        var locaFilePath = req.files["files"][i].path;
        var result = await cloudUpload(locaFilePath);
        filesArray.push({ url: result.url, image_id: result.public_id });
      }

      // req.files["files"].forEach((element) => {
      //   const file = {
      //     cloudinary.uploader.upload(element.path)
      //     // fileSize: fileSizeFormatter(element.size, 2),
      //   };
      //   filesArray.push(file);
      // });

      const goal = await Goal.create({
        user: req.user.id,
        //PROFILE PRIA
        namaLkpCowo: req.body.namaLkpCowo,
        namaPglCowo: req.body.namaPglCowo,
        namaAyahCowo: req.body.namaAyahCowo,
        namaIbuCowo: req.body.namaIbuCowo,
        urutanAnakCowo: req.body.urutanAnakCowo,
        linkIGCowo: req.body.linkIGCowo,
        linkFBCowo: req.body.linkFBCowo,
        photoCowo: photoCowo.secure_url,
        idCloudPhotoCowo: photoCowo.public_id,

        //PROFILE WANITA
        namaLkpCewe: req.body.namaLkpCewe,
        namaPglCewe: req.body.namaPglCewe,
        namaAyahCewe: req.body.namaAyahCewe,
        namaIbuCewe: req.body.namaIbuCewe,
        urutanAnakCewe: req.body.urutanAnakCewe,
        linkIGCewe: req.body.linkIGCewe,
        linkFBCewe: req.body.linkFBCewe,
        photoCewe: photoCewe.secure_url,
        idCloudPhotoCewe: photoCewe.public_id,

        //AKAD
        tglAkad: req.body.tglAkad,
        waktuAkad: req.body.waktuAkad,
        waktuBagianAkad: req.body.waktuBagianAkad,
        alamatAkad: req.body.alamatAkad,
        linkAlmtAkad: req.body.linkAlmtAkad,

        //RESEPSI
        tglResepsi: req.body.tglResepsi,
        waktuResepsi: req.body.waktuResepsi,
        waktuBagianResepsi: req.body.waktuBagianResepsi,
        alamatResepsi: req.body.alamatResepsi,
        linkAlmtResepsi: req.body.linkAlmtResepsi,

        //DOMPET DIGITAL
        namaBank: req.body.namaBank,
        noRek: req.body.noRek,
        atasNamaBank: req.body.atasNamaBank,
        namaDompet: req.body.namaDompet,
        noHp: req.body.noHp,
        atasNamaDompet: req.body.atasNamaDompet,

        //GALERI
        idYT: req.body.idYT,
        linkLive: req.body.linkLive,
        files: filesArray,
        photoBerdua: photoBerdua.secure_url,
        idCloudPhotoBerdua: photoBerdua.public_id,
        music: music.secure_url,
        idCloudMusic: music.public_id,

        // music: req.file["music"].path,
      });
      res.status(201).json(goal);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

// @desc    Put goals
// @route   PUT /api/goals
// @access  Private
const goalUpdate = asyncHandler(async (req, res) => {

  const id = req.params.id

  try {
    let goal = await Goal.findById(req.params.id);

    //DELETE FILE
    const cloudDelete = await cloudinary.uploader.destroy;
    cloudDelete(goal.idCloudPhotoCowo);
    cloudDelete(goal.idCloudPhotoCewe);
    cloudDelete(goal.idCloudPhotoBerdua);
    cloudDelete(goal.idCloudMusic, { resource_type: "video" });
    goal.files.map((file) => {
      const hapus = file.image_id;
      cloudDelete(hapus);
    });

    //POST FILE
    const cloudUpload = await cloudinary.uploader.upload;
    const photoCowo = await cloudUpload(req.files["photoCowo"][0].path);
    const photoCewe = await cloudUpload(req.files["photoCewe"][0].path);
    const photoBerdua = await cloudUpload(req.files["photoBerdua"][0].path);
    const music = await cloudUpload(req.files["music"][0].path, {
      resource_type: "video",
    });

    let filesArray = [];

    for (var i = 0; i < req.files["files"].length; i++) {
      var locaFilePath = req.files["files"][i].path;
      var result = await cloudUpload(locaFilePath);
      filesArray.push({ url: result.url, image_id: result.public_id });
    }

    const data = {
      //PROFILE PRIA
      namaLkpCowo: req.body.namaLkpCowo || goal.namaLkpCowo,
      namaPglCowo: req.body.namaPglCowo || goal.namaPglCowo,
      namaAyahCowo: req.body.namaAyahCowo || goal.namaAyahCowo,
      namaIbuCowo: req.body.namaIbuCowo || goal.namaIbuCowo,
      urutanAnakCowo: req.body.urutanAnakCowo || goal.urutanAnakCowo,
      linkIGCowo: req.body.linkIGCowo || goal.linkIGCowo,
      linkFBCowo: req.body.linkFBCowo || goal.linkFBCowo,
      photoCowo: photoCowo.secure_url || goal.photoCowo,
      idCloudPhotoCowo: photoCowo.public_id || goal.idCloudPhotoCowo,

      //PROFILE WANITA
      namaLkpCewe: req.body.namaLkpCewe || goal.namaLkpCewe,
      namaPglCewe: req.body.namaPglCewe || goal.namaPglCewe,
      namaAyahCewe: req.body.namaAyahCewe || goal.namaAyahCewe,
      namaIbuCewe: req.body.namaIbuCewe || goal.namaIbuCewe,
      urutanAnakCewe: req.body.urutanAnakCewe || goal.urutanAnakCewe,
      linkIGCewe: req.body.linkIGCewe || goal.linkIGCewe,
      linkFBCewe: req.body.linkFBCewe || goal.linkFBCewe,
      photoCewe: photoCewe.secure_url || goal.photoCewe,
      idCloudPhotoCewe: photoCewe.public_id || goal.idCloudPhotoCewe,

      //AKAD
      tglAkad: req.body.tglAkad || goal.tglAkad,
      waktuAkad: req.body.waktuAkad || goal.waktuAkad,
      waktuBagianAkad: req.body.waktuBagianAkad || goal.waktuBagianAkad,
      alamatAkad: req.body.alamatAkad || goal.alamatAkad,
      linkAlmtAkad: req.body.linkAlmtAkad || goal.linkAlmtAkad,

      //RESEPSI
      tglResepsi: req.body.tglResepsi || goal.tglResepsi,
      waktuResepsi: req.body.waktuResepsi || goal.waktuResepsi,
      waktuBagianResepsi: req.body.waktuBagianResepsi || goal.waktuBagianResepsi,
      alamatResepsi: req.body.alamatResepsi || goal.alamatResepsi,
      linkAlmtResepsi: req.body.linkAlmtResepsi || goal.linkAlmtResepsi,

      //DOMPET DIGITAL
      namaBank: req.body.namaBank || goal.namaBank,
      noRek: req.body.noRek || goal.noRek,
      atasNamaBank: req.body.atasNamaBank || goal.atasNamaBank,
      namaDompet: req.body.namaDompet || goal.namaDompet,
      noHp: req.body.noHp || goal.noHp,
      atasNamaDompet: req.body.atasNamaDompet || goal.atasNamaDompet,

      //GALERI
      idYT: req.body.idYT || goal.idYT,
      linkLive: req.body.linkLive || goal.linkLive,
      files: filesArray || goal.files,
      photoBerdua: photoBerdua.secure_url || goal.photoBerdua,
      idCloudPhotoBerdua: photoBerdua.public_id || goal.idCloudPhotoBerdua,
      music: music.secure_url || goal.music,
      idCloudMusic: music.public_id || goal.idCloudMusic,
    };

    goal = await Goal.findByIdAndUpdate(id, data, { new: true });
    res.json(goal);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const goalDelete = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  Goal.findById(id)
    .then((post) => {
      if (!post) {
        const err = new Error("Undangan tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      } else cloudDelete = cloudinary.uploader.destroy;

      cloudDelete(post.idCloudPhotoCowo);
      cloudDelete(post.idCloudPhotoCewe);
      cloudDelete(post.idCloudPhotoBerdua);
      cloudDelete(post.idCloudMusic, { resource_type: "video" });

      post.files.map((file) => {
        const hapus = file.image_id;
        cloudDelete(hapus);
      });

      return Goal.findByIdAndRemove(id);
    })

    .then((files) => {
      res.status(200).json({
        message: "hapus undangan berhasil",
        data: files,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc    Get goalsById
// @route   GET /api/goals/:id
// @access  Private
const getGoalById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  Goal.findById(id)
    .then((files) => {
      if (!files) {
        const error = new Error("Undangan tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Undangan Berhasil dipanggil",
        data: files,
      });
    })
    .catch((err) => {
      next(err);
    });
});

const postComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

    Goal
      .findById(id)

      .then((post) => {
        if (!post) {
          const err = new Error("Undangan tidak ditemukan");
          err.errorStatus = 404;
          throw err;
        }

        const nameComment = req.body.nameComment;
        const isiComment = req.body.isiComment;

        const comment = {
          nameComment: nameComment,
          isiComment: isiComment,
        };

        post.comments.push(comment);

        return post.save();
      })
      .then((files) => {
        res.status(200).json({
          message: "Comment Berhasil diUpload",
          data: files,
        });
      })
      .catch((err) => {
        next(err);
      });
})


// const fileSizeFormatter = (bytes, decimal) => {
//   if (bytes === 0) {
//     return "0 Bytes";
//   }
//   const dm = decimal || 2;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
//   const index = Math.floor(Math.log(bytes) / Math.log(1000));
//   return (
//     parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
//   );
// };

// const removeFile = (filePath) => {
//   const hapusFile = path.join(__dirname, "../../", filePath);
//   fs.unlink(hapusFile, (err) => console.log(err));
// };

module.exports = {
  getGoals,
  getGoalById,
  goalPost,
  goalUpdate,
  goalDelete,
  postComment,
};
