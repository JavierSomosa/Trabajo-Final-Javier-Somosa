const express = require("express");
const router = express.Router();
const { crearEncuesta, upload } = require("../controllers/encuesta.controller");
const validarEncuesta = require("../middlewares/validarEncuesta");

router.post("/", upload.single("imagen"), validarEncuesta, crearEncuesta);

module.exports = router;