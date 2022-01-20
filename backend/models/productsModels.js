const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Please Enter product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product Price"],
      maxLength: [8, "Price is too high"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "maximum stock allowed is 9999"],
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });




module.exports = mongoose.model("Product", productSchema);