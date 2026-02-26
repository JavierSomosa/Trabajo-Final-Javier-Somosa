const express = require("express");
const router = express.Router();
const { crearEncuesta, upload } = require("../controllers/encuesta.controller");

router.post("/", upload.single("imagen"), crearEncuesta);

module.exports = router;