const { Router } = require("express");
const { upload } = require("../middleware/multer");
const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  deleteProduct,
} = require("../controllers/productsController");
const router = Router();

router.post("/create", upload.single("image"), createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductsByCategory", getProductsByCategory);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
