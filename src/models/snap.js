const mongoose = require("mongoose");

const snapSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   // required: true,
    //   ref: "User",
    // },
    transactionToken: {
      type: String,
      allowNull: true,
    },
    transactionRedirectUrl: {
      type: String,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = mongoose.model("Snap", snapSchema);
