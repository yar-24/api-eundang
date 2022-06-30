const snapApi = require("../middleware/order");
const asyncHandler = require("express-async-handler");
const Snap = require("../models/snap");
const midtransClient = require('midtrans-client');

let SnapApi = new midtransClient.Snap({
    isProduction : false,
    serverKey : process.env.ORDER_SERVER_KEY,
    clientKey : process.env.ORDER_CLIENT_KEY
});

const createSnap = asyncHandler((req, res, next) => {
  SnapApi.createTransaction(req.body)
    .then((transaction) => {
      const dataSnap = {
        // user: req.user.id,
        transactionToken: transaction.token,
        transactionRedirectUrl: transaction.redirect_url,
      };
      Snap.create(dataSnap)
        .then((data) => {
          res.json({
            status: true,
            pesan: "Berhasil Order",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: false,
            pesan: "Gagal Order: " + err.message,
            data: [],
          });
        });
    })
    .catch((e) => {
      res.json({
        status: false,
        pesan: "Gagal order: " + e.message,
        data: [],
      });
    });
});

const getSnaps = asyncHandler((req, res, next) => {
  Snap.find()
    .then((data) => {
      res.json({
        status: true,
        pesan: "Berhasil Tampil",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        pesan: "Gagal tampil: " + err.message,
        data: [],
      });
    });
});

const getSnap = asyncHandler((req, res, next) => {
  const id = req.params.id
  Snap.findById(id)
    .then((data) => {
      res.json({
        status: true,
        pesan: "Berhasil Tampil",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        pesan: "Gagal tampil: " + err.message,
        data: [],
      });
    });
});

module.exports = {
  createSnap,
  getSnaps,
  getSnap,
};
