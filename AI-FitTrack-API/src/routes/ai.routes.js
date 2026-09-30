const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const controller = require("../controllers/ai.controller");

router.post("/recommendations", protect, controller.recommendations);
router.get("/insights", protect, controller.insights);

module.exports = router;