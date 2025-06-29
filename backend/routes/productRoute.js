const { Router } = require("express");
const { uploadSingle } = require("../middleware/multer");
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  deleteProduct,
} = require("../controllers/productsController");
const router = Router();

router.post("/create", uploadSingle, createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductsByCategory", getProductsByCategory);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
