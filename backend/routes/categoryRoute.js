const {
  createCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const { Router } = require("express");
const router = Router();

router.post("/create", createCategory);
router.get("/getAll", getAllCategory);

module.exports = router;
