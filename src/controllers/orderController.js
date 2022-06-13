const coreApi = require("../middleware/order");
const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const midtransClient = require('midtrans-client');

// let coreApi = new midtransClient.CoreApi({
//     isProduction : false,
//     serverKey : "SB-Mid-server-xGm1j61vCnt1r-jsWX-jsi35",
//     clientKey :"SB-Mid-client-QM3YEJ7SdqO0rhp3",
// });


const getOrder = asyncHandler((req, res, next) => {
  Order.findAll()
    .then((data) => {
      res.json({
        status: true,
        message: "Berhasil Order",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "Gagal Order" + err.message,
        data: [],
      });
    });
});

const postOrder = asyncHandler((req, res, next) => {
  coreApi
    .charge(req.body)
    .then((chargeResponse) => {
      const dataOrder = {
        id: chargeResponse.order_id,
        tiket_id: req.body.tiket_id,
        nama: req.body.nama,
        response_midtrans: JSON.stringify(chargeResponse),
      };

      Order.create(dataOrder)
        .then((data) => {
          res.json({
            status: true,
            message: "Berhasil Order",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: false,
            message: "Gagal Order" + err.message,
            data: [],
          });
        });
    })
    .catch((e) => {
      res.json({
        status: false,
        message: "Gagal Order" + e.message,
        data: [],
      });
    });
});

const notifikasiOrder = asyncHandler((req, res, next) => {
  coreApi.transaction.notification(req.body).then((statusResponse) => {
    let orderId = statusResponse.order_id;
    let responseMidtrans = JSON.stringify(statusResponse);
    Order.updateOne(
      { response_midtrans: responseMidtrans },
      {
        where: { id: orderId },
      }
    )
      .then(() => {
        res.json({
          status: true,
          pesan: "Berhasil Notifikasi",
          data: [],
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          pesan: "Gagal Notifikasi: " + err.message,
          data: [],
        });
      });
  });
});

const getOrderOffline = asyncHandler((req, res, next) => {
  coreApi.transaction
    .status(req.params.order_id)

    .then((statusResponse) => {
      let responseMidtrans = JSON.stringify(statusResponse);
      Order.updateOne(
        { response_midtrans: responseMidtrans },
        {
          where: { id: req.params.order_id },
        }
      )
        .then(() => {
          res.json({
            status: true,
            pesan: "Berhasil cek status",
            data: statusResponse,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: false,
            pesan: "Gagal cek status: " + err.message,
            data: [],
          });
        });
    });
});

module.exports = {
  getOrder,
  postOrder,
  notifikasiOrder,
  getOrderOffline,
};
