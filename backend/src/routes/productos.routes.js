import {Router} from "express";

import {
    getProductos,
    getProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.controller.js";

import esAdmin from "../middlewares/admin.middleware.js";
import verificarToken from "../middlewares/auth.middleware.js";

const router = Router();

// GET todos los productos
router.get("/", getProductos);

// GET producto por ID
router.get("/:id", getProductoById);

// POST crear un producto
router.post("/", 
    verificarToken,
    esAdmin,
    crearProducto);

// PUT actualizar un producto
router.put("/:id", 
    verificarToken,
    esAdmin,
    actualizarProducto);

// DELETE eliminar un producto
router.delete("/:id", 
    verificarToken,
    esAdmin,
    eliminarProducto);

export default router;
