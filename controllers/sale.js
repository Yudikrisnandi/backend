const Sale = require('../models/Sale');
const cloudinary = require('../cloudinary')

exports.getSales = async(req, res) => {
  try {
    const sales = await Sale.find({}).populate('products.productId');
    res.json({
      status: 'success',
      data: sales 
    })
  }catch(err){
    res.json(err)
  }
}

exports.createSale = async(req, res) => {
  try {
    const { products, totalSale } = req.body;
    const newSale = new Sale({
      products,
      totalSale,
    })
    await newSale.save()
    res.status(201).json({ message: "success" })
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

