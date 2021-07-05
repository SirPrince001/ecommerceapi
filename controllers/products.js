require("../imageUploadMiddleware/cloudinary");
const Product = require("../models/products");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
require("dotenv").config();

// controller for creating a product
exports.createProduct = async (request, response) => {
  try {
    //   // check if category already exist
    //  const  existingCategory = await Category.findById(request.body.category);
    //  if (!existingCategory)
    //    return response
    //      .status(400)
    //      .json({ success: false, message: "Invalid Category" });

    let productValues = {
      ...request.body,
      image: request.file.path,
    
    };

    // create new product and save to the db

    let newProduct = new Product({
      name: productValues.name,
      description: productValues.description,
      richDescription: productValues.richDescription,
      image: productValues.image,
      brand: productValues.brand,
      price: productValues.price,
      category: productValues.category,
      countInstock: productValues.countInstock,
      rating: productValues.rating,
      numReviews: productValues.numReviews,
      isFeatured: productValues.isFeatured,
    });
    let savedNewProduct = await newProduct.save();
    return response.status(200).json({
      success: true,
      message: savedNewProduct,
    });
  } catch (error) {
    return response.status(422).json({
      success: false,
      message: `Failed to save new product due to ${error}`,
    });
  }
};

// controller fot getting all products

exports.getAllProducts = async (request, response) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id))
      return response.status(404).json({ message: "Invalid Product ID" });
    const allProducts = await Product.find({}).populate("category");
    return response.status(200).json({
      success: true,
      message: allProducts,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to get all product due to ${error}`,
    });
  }
};

//controller for getting single product

exports.getProductById = async (request, response) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(404).json({ message: "Invalid Product ID" });
    }
    const singleProduct = await Product.findById(request.params.id).populate(
      "category"
    );
    return response.status(200).json({
      success: true,
      message: singleProduct,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to get product by ID ${singleProduct}`,
    });
  }
};

// controller for getting selected field
exports.getSelectedField = async (request, response) => {
  try {
    const selectedField = await Product.find({}).select(
      "name image category -_id"
    );
    return response.status(200).json({ success: true, message: selectedField });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to get selected product due to ${error}`,
    });
  }
};

//controller for updating product by ID
exports.updateProductById = async (request, response) => {
  try {
    let {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInstock,
      rating,
      numReviews,
      isFeatured,
    } = request.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      request.params.id,
      {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInstock,
        rating,
        numReviews,
        isFeatured,
      },
      { new: true }
    );
    return response
      .status(200)
      .json({ success: true, message: updatedProduct });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to update product by ID ${updatedProduct} due to ${error}`,
    });
  }
};

// controller to delete product

exports.deleteProductById = async (request, response) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }
    const product_id = request.params.id;
    await Product.findByIdAndRemove(product_id);
    return response.status(200).json({
      success: true,
      message: `Product with this ID ${product_id} was deleted successfully`,
    });
  } catch (error) {
    return response.status(200).json({
      success: true,
      message: `Failed to update product by ID due to ${error}`,
    });
  }
};

exports.getFeaturedProduct = async (request, response) => {
  try {
    const count = request.params.count ? request.params.count : 0;
    const featured = await Product.find({ isFeatured: true }).limit(+count);
    return response.status(200).json({ success: true, message: featured });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to get featured products due to ${error}`,
    });
  }
};

exports.getProductByCategory = async (request, response) => {
  try {
    let filter = {};
    if (request.query.categories) {
      filter = { category: request.query.categories.splite(" ,") };
    }
    const productCategoory = await Product.find({ filter });
    return response
      .status(200)
      .json({ success: true, message: productCategoory });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: `Failed to get product by category due to ${error}`,
    });
  }
};

exports.updateImageGallery = async (request, response) => {
  try {
    const id = request.params.id
    if (!mongoose.isValidObjectId(id))
      return response.status(422).json({
        success: false,
        message: "Invalid product ID",
      });
      
 
  const data = {...request.body , images : request.files.map((file)=> file.path)}
  const Doc =  await Product.findById(id)
  const imageD = data.images
  imageD.forEach((image)=>{
    Doc.images.push(image)
  })

  const newDoc = await Doc.save()
  console.log(newDoc)
  

  
    return response
      .status(200)
      .json({ success: true, message: newDoc });
  } catch (error) {
    return response
      .status(422)
      .json({
        success: false,
        message: `Failed to update the image gallery due to ${error}`,
      });
  }
};
