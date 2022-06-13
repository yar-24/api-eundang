// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const dataUndang = require("../models/Undang");
// const { fileUploads, comments } = require("../../helpers/filehelper");
// const path = require("path");
// const fs = require("fs");

// const router = express.Router();

// //BUAT UNDANGAN
// router.post(
//   "/undang",
//   [
//     body("namaPasangan"),
//     fileUploads.fields([
//       { name: "files" },
//       { name: "photoCowo" },
//       { name: "photoCewe" },
//       { name: "photoBerdua" },
//     ]),
//   ],
//   async (req, res) => {
//     if (!req.files) {
//       const err = new Error("Gambar harus diupload!!");
//       err.errorStatus = 422;
//       throw err;
//     } else {
//       try {
//         let filesArray = [];
//         req.files["files"].forEach((element) => {
//           const file = {
//             filePath: element.path,
//             fileSize: fileSizeFormatter(element.size, 2),
//           };
//           filesArray.push(file);
//         });

//         const Posting = new dataUndang({
//           namaPasangan: req.body.namaPasangan,
//           files: filesArray,
//           photoCowo: req.files["photoCowo"][0].path,
//           photoCewe: req.files["photoCewe"][0].path,
//           photoBerdua: req.files["photoBerdua"][0].path,
//         });
//         await Posting.save();

//         res.status(201).send("Files Uploaded Successfully");
//       } catch (error) {
//         res.status(400).send(error.message);
//       }
//     }
//   }
// );

// //MELIHAT UNDANGAN DENGAN ID
// router.get("/undang/:postId", (req, res, next) => {
//   const postId = req.params.postId;

//   dataUndang
//     .findById(postId)

//     .then((files) => {
//       if (!files) {
//         const error = new Error("Undangan tidak ditemukan");
//         error.errorStatus = 404;
//         throw error;
//       }
//       res.status(200).json({
//         message: "Data Undangan Berhasil dipanggil",
//         data: files,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// //MELIHAT SEMUA UNDANGAN USER
// router.get("/allUndangan", async (req, res) => {
//   try {
//     const undangans = await dataUndang.find();
//     res.status(200).send(undangans);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// //MENGUPDATE UNDANGAN
// router.put(
//   "/undang/:postId",
//   [
//     body("namaPasangan"),
//     fileUploads.fields([
//       { name: "files" },
//       { name: "photoCowo" },
//       { name: "photoCewe" },
//       { name: "photoBerdua" },
//     ]),
//   ],
//   async (req, res, next) => {
//     const postId = req.params.postId;
//     // const errors = validationResult(req);

//     dataUndang
//       .findById(postId)
//       .then((post) => {
//         if (!post) {
//           const err = new Error("Undangan tidak ditemukan");
//           err.errorStatus = 404;
//           throw err;
//         } else {
//           post.files.forEach((file) => {
//             const hapus = file.filePath;

//             const filesArray = path.join(__dirname, "../../", hapus);
//             fs.unlink(filesArray, (err) => console.log(err));
//             removeFile(post.photoCowo);
//             removeFile(post.photoCewe);
//             removeFile(post.photoBerdua);
//           });
//         }
       
//           let filesArray = [];
//           req.files["files"].forEach((item) => {
//             const file = {
//               filePath: item.path,
//               fileSize: fileSizeFormatter(item.size, 2),
//             };
//             filesArray.push(file);
//           });

//           post.namaPasangan = req.body.namaPasangan;
//           post.files = filesArray;
//           post.photoCowo = req.files["photoCowo"][0].path;
//           post.photoCewe = req.files["photoCewe"][0].path;
//           post.photoBerdua = req.files["photoBerdua"][0].path;

//           return post.save();
//       })
//       .then((files) => {
//         res.status(200).json({
//           message: "Update Berhasil",
//           data: files,
//         });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
// );

// //HAPUS UNDANGAN
// router.delete("/undang/:postId", async (req, res, next) => {
//   const postId = req.params.postId;

//   dataUndang
//     .findById(postId)
//     .then((post) => {
//       if (!post) {
//         const err = new Error("Undangan tidak ditemukan");
//         err.errorStatus = 404;
//         throw err;
//       } else
//         post.files.forEach((file) => {
//           const hapus = file.filePath;

//           const filesArray = path.join(__dirname, "../../", hapus);
//           fs.unlink(filesArray, (err) => console.log(err));
//         });

//       if (post.photoCewe) {
//         removeFile(post.photoCewe);
//       }
//       if (post.photoCowo) {
//         removeFile(post.photoCowo);
//       }
//       if (post.photoBerdua) {
//         removeFile(post.photoBerdua);
//       }
//       // if (post.music) {
//       //   removeFile(post.music);
//       // }

//       return dataUndang.findByIdAndRemove(postId);
//     })

//     .then((files) => {
//       res.status(200).json({
//         message: "hapus undangan berhasil",
//         data: files,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// //POST KOMEN DIUNDANGAN
// router.post(
//   "/comment/:postId",
//   [comments.array("name", "isiComment")],
//   (req, res, next) => {
//     const postId = req.params.postId;

//     dataUndang
//       .findById(postId)

//       .then((post) => {
//         if (!post) {
//           const err = new Error("Undangan tidak ditemukan");
//           err.errorStatus = 404;
//           throw err;
//         }

//         const name = req.body.name;
//         const isiComment = req.body.isiComment;

//         const comment = {
//           name: name,
//           isiComment: isiComment,
//         };

//         post.comments.push(comment);

//         return post.save();
//       })
//       .then((files) => {
//         res.status(200).json({
//           message: "Comment Berhasil diUpload",
//           data: files,
//         });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
// );

// const removeFile = (filePath) => {
//   const hapusFile = path.join(__dirname, "../../", filePath);
//   fs.unlink(hapusFile, (err) => console.log(err));
// };

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

// module.exports = router;
