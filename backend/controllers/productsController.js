const { prisma } = require("../utlis/db");
const fs = require("fs");

// POST /products – Add product
const createProduct = async (req, res) => {
  try {
    const { name, price, cat_id } = req.body;
    const image = req.file ? req.file.path : null;
    if (!name || !price || !cat_id || !image) {
      return res.status(400).json({
        error: "All fields are required!",
        status: false,
        data: null,
      });
    }
    // check if product already exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: name,
      },
    });
    if (existingProduct) {
      return res.status(400).json({
        error: "Product already exists!",
        status: false,
        data: null,
      });
    }
    await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image,
        category_id: parseInt(cat_id),
      },
    });
    return res.status(201).json({
      message: "Product created successfully!",
      status: true,
      error: null,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }
    return res.status(500).json({
      error: "Something went wrong!",
      status: false,
      data: null,
    });
  }
};

// GET /products – Get all products (with category info)
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      message: "Products fetched successfully!",
      status: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
      status: false,
      data: null,
    });
  }
};

// GET /products?category_id=2 – Filter by category
const getProductsByCategory = async (req, res) => {
  const { category_id } = req.query;
  if (!category_id) {
    return res.status(400).json({
      error: "Category ID is required!",
      status: false,
      data: null,
    });
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        category_id: parseInt(category_id),
      },
      include: {
        category: true,
      },
    });
    return res.status(200).json({
      message: "Products fetched successfully!",
      status: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
      status: false,
      data: null,
    });
  }
};

// DELETE /products/:id – Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "Product ID is required!",
      status: false,
      data: null,
    });
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({
        error: "Product not found!",
        status: false,
        data: null,
      });
    }
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    // Delete the image file if it exists
    if (product.image) {
      fs.unlink(product.image, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully!",
      status: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
      status: false,
      data: null,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  deleteProduct,
};
