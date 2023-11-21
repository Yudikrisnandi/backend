const express = require('express')
const router = express.Router()
const upload = require('../multer')

const { 
  getProducts, 
  createProduct,
  editProduct,
  deleteProduct, 
} = require('../controllers/product')

router.get('/', getProducts)
router.post('/', upload.single('image'), createProduct)
router.post('/:id', upload.single('image'), editProduct)
router.delete('/:id', deleteProduct)

module.exports = router;
