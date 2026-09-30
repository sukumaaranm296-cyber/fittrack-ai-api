const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const controller = require("../controllers/workout.controller");

router.use(protect);

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/search", controller.search);
router.get("/stats", controller.stats);
router.delete("/:id", controller.remove);

module.exports = router;