import Carrito from '../models/Carrito.js';

export const crearCarrito = async (req, res) => {
    try {
        console.log(req.body);
        const nuevoCarrito = new Carrito ({
            usuario: req.usuario.id,

            productos: req.body.productos
        });

        const carritoGuardado = await nuevoCarrito.save();

        res.status(201).json({
            message: "Pedido realizado",
            carrito: carritoGuardado
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el carrito",
            error: error.message
        });
    }
};