const Category = require("../models/category");
const mongoose = require("mongoose");
require("dotenv").config();

// create category 
exports.createCategory = async (request, response) => {
  try {
    let { name, color, icon } = request.body;

    let newCategory = new Category({
      name,
      color,
      icon,
    });
    let categoryData = await newCategory.save();
    return response.status(201).json({ Success: true, message: categoryData });
  } catch (error) {
    return response(500).json({
      response: "Error",
      message: `Failed to create category due to ${error}`,
    });
  }
};

exports.getAllCategories = async (request, response) => {
  try {
    let allCategory = await Category.find({});
    return response.status(200).json({
      Success: true,
      message: allCategory,
    });
  } catch (error) {
    return response.status(404).json({
      Success: false,
      message: `Failed to get all categories due to ${error}`,
    });
  }
};

exports.getCategoryById = async (request, response) => {
  try {
    const category_id = request.params.id
    const categoryId = await Category.findById(crequest.params.idategory_id);
    return response.status(200).json({
      Success: true,
      message: categoryId,
    });
  } catch (error) {
    return response.status(404).json({
      Success: false,
      message: `Failed to get category with this ID ${category_id} due to ${error}`,
    });
  }
};

// delete category by ID

exports.deleteCategory = async (request, response) => {
  try {
    const category_id = request.params.id;
    if (!mongoose.isValidObjectId(category_id))
      return response.status(404).json({
        Success: false,
        message: `Invalid Category ID ${category_id}`,
      });
    await Category.findByIdAndRemove(category_id);

    return response.status(200).json({
      Success: true,
      message: `Category with this ID ${category_id} have been deleted successfully`,
    });
  } catch (error) {
    return response.status(422).json({
      Success: false,
      message: `Failed to delete the category with this ID ${category_id}`,
    });
  }
};

// update category by ID
exports.updateCategory = async (request, response) => {
  try {
    const updated_category_id = request.params.id;
    if (!mongoose.isValidObjectId(updated_category_id))
      return response.status(404).json({
        Success: false,
        message: `Invalid Category ID ${updated_category_id}`,
      });
    let { name, color, icon } = request.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      updated_category_id,
      { name, color, icon },
      { new: true }
    );
    return response.status(200).json({
      Success: true,
      message: updatedCategory,
    });
  } catch (error) {
    return response.status(422).json({
      Success: false,
      message: `Failed to update a category with this ID ${updated_category_id}`,
    });
  }
};
