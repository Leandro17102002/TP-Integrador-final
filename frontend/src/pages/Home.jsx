import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

function Home() {

    const { usuario, logout } = useAuth();
    const { agregarAlCarrito } = useCarrito();

    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async() => {
        try{
            const response = await fetch (
                'http://localhost:3000/api/productos',
            );

            const data = await response.json();
            console.log(data);
            setProductos(data);
        } catch (error){
            console.log(error);
        }
    };


    return (
        <div style={{
            backgroundColor: '#f8f5f2',
            minHeight: '100vh'
        }}>
            <div className='container-fluid p-0 mb-5'>
                <div className='w-100 bg-light d-flex justify-content-center align-items-center' 
                style={{ 
                    height: '40vh',
                    overflow: 'hidden',
                    backgroundColor: '#efe7dd',
                    borderBottomLeftRadius: '35px',
                    borderBottomRightRadius: '35px'
                    }}>
                    <h2
                    className='fw-bold'
                    style={{
                        fontSize: '3rem',
                        color: '#5c4033'
                    }}
                    >
                        Pastas Artesanales
                    </h2>
                </div>
            </div>

            <div className="container mb-4">
                <div className="text-center mb-5">
                    <h2 
                    className="fw-bold"
                    style={{
                        color:'#5c4033'
                    }}
                    >
                        Nuestros Productos
                    </h2>

                    <p 
                    style={{
                        color:'#8b6f5c'
                    }}
                    >
                        Elaboradas con ingredientes frescos y tradicion artesanal
                    </p>
                </div>
            </div>


            <div 
            className="container-fluid py-4"
            style={{
                paddingLeft: '6%',
                paddingRight: '6%'
            }}
            >
                <div className="row g-4">
                    {
                        productos.map((producto) => (
                            <div 
                            key={producto._id}
                            className='col-sm-6 col-md-4 col-lg-3'
                            >
                                <div 
                                className="card h-100 border-0"
                                style={{
                                    borderRadius: '25px',
                                    overflow: 'hidden',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                                }}
                                >

                                    <img
                                    src={producto.imagen}
                                    className='card-img-top'
                                    alt={producto.nombre}
                                    style={{
                                        height: '210px',
                                        objectFit:'cover'
                                    }}
                                    />

                                    <div className="card-body d-flex flex-column p-3">
                                        <h5 
                                        className='card-title'
                                        style={{
                                            color:'#4b3429'
                                        }}
                                        >
                                            {producto.nombre}
                                        </h5>

                                        <p 
                                        className='card-text'
                                        style={{
                                            color: '#7a685d'
                                        }}
                                        >
                                            {producto.descripcion}
                                        </p>
                                        
                                        <p 
                                        className='fw-bold fs-5 mt-2'
                                        style={{
                                            color: '#5c4033'
                                        }}
                                        >
                                            Precio: ${producto.precio}
                                        </p>

                                        <button
                                        className='btn mt-auto' 
                                        style={{
                                            backgroundColor: '#5c4033',
                                            color: 'white',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            border: 'none'
                                        }}

                                        onClick = {() => {
                                            if (!usuario) {
                                                alert("Debes iniciar sesión para agregar al carrito");
                                                return;
                                            }

                                            agregarAlCarrito(producto);
                                        }}>
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>     



        </div>
    );
}

export default Home;