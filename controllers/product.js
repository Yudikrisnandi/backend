const Product = require('../models/Product');
const cloudinary = require('../cloudinary')

exports.getProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      status: 'success',
      data: products
    })
  }catch(err){
    res.json(err)
  }
}

exports.createProduct= async(req, res) => {
  try {
    const {  
      name,
      price,
      category,
      inStock,
    } = req.body
    
    // upload image to cloudinary
    const productImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resouce_type: 'auto' }, (error, result) => {
        if(error) reject(error)
        else resolve(result)
      })
      stream.end(req.file.buffer)
    })

    const product = await Product.create({
      name,
      price,
      category,
      inStock,
      image: productImage.secure_url,
    })

    res.status(201).json({ message: 'success', data: product })
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.deleteProduct = async(req, res) => {
  const id = req.params.id
  try {
    const deletedData = await Product.findOneAndDelete({ _id: id });
    if(!deletedData){
      return res.status(404).json({ message: "Data not found" })
    }
    res.status(200).json({
      status: 'Data deleted successfully',
    })
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

exports.editProduct = async(req, res) => {
  const id = req.params.id
  try {
     const {  
      name,
      price,
      category,
      inStock,
      image,
    } = req.body

    let productImage = {}

    if(req.file){
      productImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resouce_type: 'auto' }, (error, result) => {
          if(error) reject(error)
          else resolve(result)
        })
        stream.end(req.file.buffer)
      })   
    }else if(req.body && req.body.image){
      productImage.secure_url = image
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { name, price, category, inStock, image: productImage.secure_url } },
      { new: true }
    )
    if(!product){
      res.status(404).json({ message: 'Data not found' })
    }

    res.status(200).json({
      status: 'success',
      data: product
    })
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
