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
router.get("/productos", getProductos);

// GET producto por ID
router.get("/productos/:id", getProductoById);

// POST crear un producto
router.post("/productos", crearProducto);

// PUT actualizar un producto
router.put("/productos/:id", actualizarProducto);

// DELETE eliminar un producto
router.delete("/productos/:id", eliminarProducto);

export default router;
