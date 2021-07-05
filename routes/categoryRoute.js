const router = require("express").Router();
const Categories = require("../controllers/category");

router.post("/api/v1/create-category", Categories.createCategory);
router.get("/api/v1/get-all-category", Categories.getAllCategories);
router.get("/api/v1/get-category-by-id/:id", Categories.getCategoryById);
router.delete("/api/v1/delete-category-by-id/:id", Categories.deleteCategory);
router.put("/api/v1/update-category-by-id/:id", Categories.updateCategory);

module.exports = router;
