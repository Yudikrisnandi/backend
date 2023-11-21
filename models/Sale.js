const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    },
  ],
  totalSale: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Sale', SaleSchema);
