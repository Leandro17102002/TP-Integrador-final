import {Router} from "express";

import {
    getProductos,
    getProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.controller.js";

const router = Router();

// GET todos los productos
router.get("/", getProductos);

// GET producto por ID
router.get("/:id", getProductoById);

// POST crear un producto
router.post("/", crearProducto);

// PUT actualizar un producto
router.put("/:id", actualizarProducto);

// DELETE eliminar un producto
router.delete("/:id", eliminarProducto);

export default router;
