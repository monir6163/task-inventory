const { prisma } = require("../utlis/db");

// POST /category – Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).json({
        error: "Name is Required!",
        status: false,
        data: null,
      });
    }
    const existingCategory = await prisma.category.findFirst({
      where: {
        cat_name: name,
      },
    });
    if (existingCategory) {
      return res.status(400).json({
        error: "Category already exists!",
        status: false,
        data: null,
      });
    }

    await prisma.category.create({
      data: {
        cat_name: name,
      },
    });

    return res.status(201).json({
      message: "Category Created Successfully!",
      status: true,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong!",
      status: false,
      data: null,
    });
  }
};

// GET /category – Get all categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (categories.length === 0) {
      return res.status(404).json({
        error: "No Categories Found!",
        status: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Categories fetched successfully!",
      status: true,
      data: categories,
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
  createCategory,
  getAllCategory,
};
