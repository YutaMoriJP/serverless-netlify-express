const express = require("express");
const aboutController = require("../Controller/aboutController");
const router = express.Router();

router.get("/", aboutController);

module.exports = router;
