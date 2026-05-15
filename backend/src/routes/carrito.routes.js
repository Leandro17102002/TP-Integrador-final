import { Router } from "express";

import { crearCarrito } from "../controllers/carrito.controller.js";
import verificarToken from "../middlewares/auth.middleware.js";

const router = Router();

// POST crear un carrito
router.post(
    "/", 
    verificarToken,
    crearCarrito
);

export default router;