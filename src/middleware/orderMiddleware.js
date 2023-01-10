const midtransClient = require("midtrans-client");

let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.ORDER_SERVER_KEY,
  clientKey: process.env.ORDER_CLIENT_KEY,
});

module.exports = coreApi;
