// importar loginController y generar las rutas para el registro y el login
const loginController = require("../Controller/loginController");
const verifyToken = require("../middlewares/auth");
const router = require('express').Router();

// endpoint para el registro de usuarios
router.post("/signup", loginController.register);
// endpoint para el login de usuarios
router.post("/login", loginController.login);
// endpoint para refrescar el token
router.get("/refresh", verifyToken, loginController.refreshToken);

module.exports = router;
