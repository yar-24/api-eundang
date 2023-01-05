const mongoose = require("mongoose");

const paySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    id: {
      type: String,
      primaryKey: true,
    },
    paketUndangan : {
      type: String
    },
    paketHarga : {
      type: String
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

module.exports = mongoose.model("Pay", paySchema);
