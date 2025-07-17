const express = require("express");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect ,checkPermission} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getProjects).post(protect,checkPermission("canCreateProjects"), createProject);
router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect,checkPermission("canEditProjects"), updateProject ,)
  .delete(protect,checkPermission("canDeleteProjects"), deleteProject);

module.exports = router;
