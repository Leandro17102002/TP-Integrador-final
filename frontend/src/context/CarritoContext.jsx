import {
    createContext,
    useContext,
    useState
} from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {

    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {

        const productoExistente = carrito.find(
            (item) => item.producto === producto._id
        );

        if (productoExistente) {

            const nuevoCarrito = carrito.map((item) =>

                item.producto === producto._id

                    ? {
                        ...item,
                        cantidad: item.cantidad + 1
                    }

                    : item

            );

            setCarrito(nuevoCarrito);

        } else {

            setCarrito([
                ...carrito,
                {
                    producto: producto._id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1
                }
            ]);

        }

    };

    const eliminarDelCarrito = (id) => {

        const nuevoCarrito = carrito.filter(
            (item) => item.producto !== id
        );

        setCarrito(nuevoCarrito);

    };

    const vaciarCarrito = () => {

        setCarrito([]);

    };

    return (

        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito
            }}
        >

            {children}

        </CarritoContext.Provider>

    );

}

export function useCarrito() {

    return useContext(CarritoContext);

}