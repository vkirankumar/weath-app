const express = require("express");

const configHandler = require("../handler/configHandler");

const router = express.Router();
router.get("/getconfig", configHandler);

module.exports = router;