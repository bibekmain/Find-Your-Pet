const router = require("express").Router();

const petRoutes = require("./petRoutes");// /pets
const userRoutes = require("./userRoutes");// /user
const searchRoutes = require("./searchRoutes");// /search

router.use("/user", userRoutes);
router.use("/pets", petRoutes);
router.use("/search", searchRoutes);

module.exports = router;
