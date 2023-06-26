// importar la librería de bcrypt para encriptar las contraseñas
const bcrypt = require("bcrypt");
// importar el esquema que valida los datos del body
const Login = require("../Model/loginModel");
// importar las funciones para mockear las fechas y generar los tokens
const { getFutureDate, generateToken } = require("../lib/utils");

// POST /auth/register
const register = async (req, res) => {
  try {
    // obtener los datos del body
    const { name, email, password, role } = req.body;
    // generar la fecha de registro desde la función getFutureDate
    const registerAt = getFutureDate(2025, 2030);
    // generar la fecha de último login
    const lastLogin = getFutureDate(2031, 2035);
    // generar el hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    // crear el usuario
    const newUser = new Login({
      name,
      email,
      password: passwordHash,
      registerAt,
      role,
      isActive: false,
      lastLogin,
    });
    // guardar el usuario en la base de datos
    const user = await newUser.save();
    // generar el token incluyendo id, email y role en el payload
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateToken(payload, false);
    // generar el token de refresco
    const refreshToken = generateToken(payload, true);
    // enviar respuesta con status 201, status, data y error
    return res.status(201).json({
      status: "succeeded",
      data: {
        user,
        token,
        refreshToken,
      },
      error: null,
    });
  } catch (error) {
    // si error code es 11000, enviar un error de usuario duplicado
    if (error.code === 11000) {
      return res.status(409).json({
        status: "failed",
        data: null,
        error:
          "The email is already registered. Please, try with another email.",
      });
    } else {
      // si no, enviar el error
      return res.status(400).json({
        status: "failed",
        data: null,
        error: error.message,
      });
    }
  }
};

// POST /auth/login
const login = async (req, res) => {
  try {
    // obtener los datos del body
    const { email, password } = req.body;
    // buscar el usuario en la base de datos
    const user = await Login.findOne({ email });
    // si no existe el usuario, enviar un error y devolver la llamada con return
    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password. Please, try again.",
      });
    }

    // si existe el usuario, comparar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    // si la contraseña es incorrecta, enviar un error
    if (!validPassword) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password. Please, try again",
      });
    }
    // si la contraseña es correcta, generar el token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateToken(payload, false);
    // generar el token de refresco
    const refreshToken = generateToken(payload, true);

    // obtener la fecha del último login para generar una posterior
    // el campo tiene el siguiente formato: 2027-08-31T22:00:00.000Z, y
    // queremos obtener el año, para generar una fecha posterior
    const lastLoginYear = parseInt(user.lastLogin.toISOString().slice(0, 4));
    // actualizar la fecha de último login
    user.lastLogin = getFutureDate(lastLoginYear + 6, +lastLoginYear + 1);
    await user.save();

    // enviar el token
    return res.status(200).json({
      status: "succeeded",
      data: {
        user,
        token,
        refreshToken,
      },
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

// GET /auth/refresh-token
const refreshToken = async (req, res) => {
  try {
    // si no hay payload desde token de refresco, enviar un error
    if (!req.user) {
      return res.status(403).json({
        status: "failed",
        data: null,
        error: "Unauthorized",
      });
    }

    // si hay token de refresco y no ha expirado, obtener el payload y enviar 2 nuevos tokens
    const payload = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };
    return res.status(200).json({
      status: "succeeded",
      data: {
        user: payload,
        token: generateToken(payload, false),
        refreshToken: generateToken(payload, true),
      },
      error: null,
    });
  } catch (err) {
    // si hay error, enviar el error
    return res.status(400).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

module.exports = { register, login, refreshToken };
