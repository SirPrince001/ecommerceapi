require("../imageUploadMiddleware/cloudinary");
const parser = require("../imageUploadMiddleware/multer");
const router = require("express").Router();
const Products = require("../controllers/products");
require("dotenv").config();

router.post(
  "/api/v1/create-product",
  parser().single("image"),
  Products.createProduct
);
router.get("/api/v1/get-all-product", Products.getAllProducts);
router.get("/api/v1/get-product-by-id/:id", Products.getProductById);
router.get("/api/v1/get-selected-product", Products.getSelectedField);
router.put("/api/v1/update-product-by-id/:id", Products.updateProductById);
router.put(
  "/api/v1/update-product-images-by-id/:id",
  parser().array("images"),
  Products.updateImageGallery
);
router.delete("/api/v1/delete-product-by-id/:id", Products.deleteProductById);
router.get("/api/v1/get-featured-product/:count", Products.getFeaturedProduct);

module.exports = router;
