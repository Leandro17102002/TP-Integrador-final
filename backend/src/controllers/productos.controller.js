import Producto from "../models/Producto.js";

// GET todos los productos
export const getProductos = async (req, res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET producto por ID
export const getProductoById = async (req, res) => {
    try{
        const producto = await Producto.findById(req.params.id);
        if(!producto){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el producto', error});
    }
};

// POST crear un producto
export const crearProducto = async (req, res)=> {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(500).json({message: 'Error al crear el producto', error});
    }
}


// PUT actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
        if(!productoActualizado){
            return res.status(404).json({message: "Producto no encontrado"})
        }
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el producto', error});
    }
}


// DELETE eliminar un producto
export const eliminarProducto = async(req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({message: "Producto no encontrado"})
        }
        res.json({message: "Producto eliminado correctamente"});
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el producto', error});
    }
}