const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    id: {
      type: String,
      primaryKey: true,
    },
    nama: {
      type: String,
      allowNull: false,
    },
    response_midtrans: {
      type: String,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
