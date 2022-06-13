const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
      primaryKey: true,
    },
    tiket_id: {
      type: Number,
      allowNull: false,
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
