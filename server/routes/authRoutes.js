const express = require("express");
const { register, login, getMe, resetPassword, toggleSaveJob, getSavedJobs, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.post("/save-job/:jobId", protect, toggleSaveJob);
router.get("/saved-jobs", protect, getSavedJobs);

module.exports = router;
