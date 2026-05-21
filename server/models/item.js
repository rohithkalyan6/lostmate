const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  category: {
    type: String,
    enum: ["id-card", "keys", "electronics", "wallet", "others"],
  },

  location: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["lost", "found"],
    required: true,
  },

  itemSize: {
    type: String,
    enum: ["small", "valuable"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "returned"],
    default: "pending",
  },

  image: {
    type: String,
    default: "",
  },

  imageUrl: {
    type: String,
    default: "",
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
