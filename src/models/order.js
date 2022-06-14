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
      allowNull: false
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

// customer_details: {
//   first_name: {type : String},
//   last_name: {type: String},
//   email: {type: String, require: true, index:true, unique:true,sparse:true},
//   phone: {type: Number},
//   allowNull: false,
// },
