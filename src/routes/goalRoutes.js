const express = require("express");
const router = express.Router();
const { fileUploads, comments } = require("../../helpers/filehelper");
const { body } = require("express-validator");
const {
  getGoals,
  getGoalById,
  goalPost,
  goalDelete,
  goalUpdate,
  postComment
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");
router.route("/").get(protect, getGoals);

//post
router.post(
  "/",
  protect,
  [
    //PRIA
    body("namaLkpCowo"),
    body("namaPglCowo"),
    body("namaAyahCowo"),
    body("namaIbuCowo"),
    body("urutanAnakCowo"),
    body("linkIGCowo"),
    body("linkFBCowo"),
    //WANITA
    body("namaLkpCewe"),
    body("namaPglCewe"),
    body("namaAyahCewe"),
    body("namaIbuCewe"),
    body("urutanAnakCewe"),
    body("linkIGCewe"),
    body("linkFBCewe"),
    // AKAD
    body("tglAkad"),
    body("waktuAkad"),
    body("alamatAkad"),
    body("linkAlmtAkad"),
    // RESEPSI
    body("tglResepsi"),
    body("waktuResepsi"),
    body("alamatResepsi"),
    body("linkAlmtResepsi"),
    // DOMPET DIGITAL
    body("namaBank"),
    body("noRek"),
    body("atasNamaBank"),
    body("namaDompet"),
    body("noHp"),
    body("atasNamaDompet"),
    // GALERI
    body("idYT"),
    body("linkLive"),
    fileUploads.fields([
      { name: "photoCowo" },
      { name: "photoCewe" },
      { name: "photoBerdua" },
      { name: "music" },
      { name: "files" },
    ]),
  ],
  goalPost, 
);

//update
router.put(
  "/:id",
  protect,
  [
    //PRIA
    body("namaLkpCowo"),
    body("namaPglCowo"),
    body("namaAyahCowo"),
    body("namaIbuCowo"),
    body("urutanAnakCowo"),
    body("linkIGCowo"),
    body("linkFBCowo"),
    //WANITA
    body("namaLkpCewe"),
    body("namaPglCewe"),
    body("namaAyahCewe"),
    body("namaIbuCewe"),
    body("urutanAnakCewe"),
    body("linkIGCewe"),
    body("linkFBCewe"),
    // AKAD
    body("tglAkad"),
    body("waktuAkad"),
    body("alamatAkad"),
    body("linkAlmtAkad"),
    // RESEPSI
    body("tglResepsi"),
    body("waktuResepsi"),
    body("alamatResepsi"),
    body("linkAlmtResepsi"),
    // DOMPET DIGITAL
    body("namaBank"),
    body("noRek"),
    body("atasNamaBank"),
    body("namaDompet"),
    body("noHp"),
    body("atasNamaDompet"),
    // GALERI
    body("idYT"),
    body("linkLive"),
    body("nameComment"),
    body("isiComment"),
    fileUploads.fields([
      { name: "photoCowo" },
      { name: "photoCewe" },
      { name: "photoBerdua" },
      { name: "music" },
      { name: "files" },
    ]),
  ], goalUpdate
);

//delete
router.delete(
  "/:id",
  protect,
  [
    body("namaPasangan"),
    fileUploads.fields([
      { name: "files" },
      { name: "photoCowo" },
      { name: "photoCewe" },
      { name: "photoBerdua" },
      { name: "music" },
    ]),
  ], goalDelete
);

//get
router.route("/:id").get(protect, getGoalById);

//postKoment
router.post("/comment/:id", protect, [comments.array("nameComment", "isiComment")], postComment)

module.exports = router;
