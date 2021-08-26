const express = require("express");
const userController = require("../Controller/userController");
const router = express.Router();

router.get("/", userController);

module.exports = router;
