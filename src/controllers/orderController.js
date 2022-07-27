const coreApi = require("../middleware/orderMiddleware");
const Pay = require("../models/payModel");
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async(req, res, next) => {
  Pay.find({ user: req.user.id })
    .then((data) => {
      var tampilData = data.map((item) => {
        return {
          _id: item._id,
          id: item.id,
          paketUndangan: item.paketUndangan,
          paketHarga: item.paketHarga,
          nama: item.nama,
          response_midtrans: JSON.parse(item.response_midtrans),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      res.json(tampilData);
    })
    .catch((err) => {
      res.json({
        status: false,
        pesan: "Gagal tampil: " + err.message,
        data: [],
      });
    });
});

const getOrdersByAdmin = asyncHandler(async(req, res, next) => {
 
  Pay.find()
    .then((data) => {
      var tampilData = data.map((item) => {
        return {
          _id: item._id,
          id: item.id,
          paketUndangan: item.paketUndangan,
          paketHarga: item.paketHarga,
          nama: item.nama,
          response_midtrans: JSON.parse(item.response_midtrans),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      res.json(tampilData);
    })
    .catch((err) => {
      res.json({
        status: false,
        pesan: "Gagal tampil: " + err.message,
        data: [],
      });
    });
});

const deleteOrder = asyncHandler((req, res, next) => {
  const id = req.params.order_id;

  Pay.findById(id)
    .then((data) => { 
      if (!data) {
        const err = new Error("Undangan tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      res.status(200).json({
        message: "Order Berhasil dihapus",
        data: data,
      });
      return Pay.findByIdAndRemove(id)
    })
    .catch((err) => {
      res.json({
        status: false,
        pesan: err.message,
        data: [],
      });
    });
})

const postOrder = asyncHandler((req, res, next) => {
  coreApi
    .charge(req.body)
    .then((chargeResponse) => {
      var dataOrder = {
        user: req.user.id,
        id: chargeResponse.order_id,
        paketUndangan: req.body.paketUndangan,
        paketHarga: req.body.paketHarga,
        nama: req.body.nama,
        response_midtrans: JSON.stringify(chargeResponse),
      };
      Pay.create(dataOrder)
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

const notificationOrder = asyncHandler((req, res, next) => {
  coreApi.transaction.notification(req.body).then((statusResponse) => {
    let orderId = statusResponse.order_id;
    let responseMidtrans = JSON.stringify(statusResponse);
    Pay.updateOne(
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

const getOrder = asyncHandler((req, res, next) => {
  coreApi.transaction.status(req.params.order_id).then((statusResponse) => {
    let responseMidtrans = JSON.stringify(statusResponse);
    Pay.updateOne(
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
        res.json({
          status: false,
          pesan: "Gagal cek status: " + err.message,
          data: [],
        });
      });
  });
});

module.exports = {
  getOrder,
  getOrders,
  getOrdersByAdmin,
  postOrder,
  notificationOrder,
  deleteOrder,
};
