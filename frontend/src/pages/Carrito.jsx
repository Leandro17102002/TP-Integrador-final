import { useCarrito } from "../context/CarritoContext";

function Carrito(){
    const {
        carrito, 
        eliminarDelCarrito,
        vaciarCarrito
    } = useCarrito();

    const total = carrito.reduce (
        (acc, item) => acc + item.precio * item.cantidad, 0
    );


    const finalizarCompra = async () => {
        try {
            const token = localStorage.getItem('token');
            const productos = carrito.map((item) => ({
                producto: item.producto,
                cantidad: item.cantidad
            }));

            const response = await fetch(
                'http://localhost:3000/api/carrito',

                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                },

                body: JSON.stringify({ productos })
                }
            );

            const data = await response.json();
            console.log(data);

            alert('Compra realizada exitosamente');
            vaciarCarrito();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div 
        className="container-fluid py-5"
        style={{
            backgroundColor: '#f8f5f2',
            minHeight: '100vh',
            paddingLeft: '6%',
            paddingRight: '6%'
        }}
        >
            
            <div className="mb-5">
            
                <h1
                className="fw-bold"
                style={{
                    color:'#4b3429'
                }}
                >
                    Tu Carrito
                </h1>

                <p
                style = {{
                    color:'#7a685d'
                }}
                >
                    Revisa tus productos antes de finalizar la compra
                </p>

            </div> 

            {
                carrito.length === 0 ? (

                    <div 
                    className="card border-0 p-5 text-center"
                    style={{
                        borderRadius: '25px',
                        backgroundColor: 'white',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                    }}
                    >
                        <h3
                        style={{
                            color:'#7a685d'
                        }}
                        >
                            El carrito esta vacio
                        </h3>  
                    </div>
                ) : (
                    <div className="row g-4">

                        <div className="col-lg-8">

                            {
                                carrito.map((item) => (
                                    <div 
                                    key={item.producto}
                                    className="card border-0 mb-4"
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: 'white',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                                    }}
                                    >
                                        
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                
                                                <div>

                                                    <h4
                                                    className="fw-bold mb-2"
                                                    style={{
                                                        color: '#4b3429'
                                                    }}
                                                    >
                                                        {item.nombre}
                                                    </h4>

                                                    <p
                                                    className="mb-1"
                                                    style={{
                                                        color: '#7a685d'
                                                    }}
                                                    >
                                                        Precio: ${item.precio}
                                                    </p>

                                                    <p
                                                    className="mb-0"
                                                    style={{
                                                        color: '#7a685d'
                                                    }}
                                                    >
                                                        Cantidad: {item.cantidad}
                                                    </p>

                                                </div>

                                            </div>
                                        </div>


                                        <button 
                                            className="btn"
                                            style={{
                                                backgroundColor: '#efe7dd',
                                                color: '#5c4033',
                                                borderRadius: '12px',
                                                border: 'none',
                                                padding: '10px 18px'
                                            }}
                                            onClick={() => eliminarDelCarrito(item.producto)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))
                            }

                        </div>

                        <div className="col-lg-4">

                            <div
                            className="card-border"
                            style={{
                                borderRadius:'25px',
                                backgroundColor:'white',
                                boxShadow:'0 10px 25px rgba(0,0,0,0.08)'
                            }}
                            >
                                <div className="card-body p-4">
                                    <h4 
                                    className="fw-bold mb-4"
                                    style={{
                                        color:'#4b3429'
                                    }}
                                    >
                                        Resumen
                                    </h4>

                                    <div className="d-flex justify-content-between mb-4">

                                        <span
                                        style = {{
                                            color:'#7a685d'
                                        }}
                                        >
                                            Total
                                        </span>
                                        <span 
                                        className="fw-bold fs-5"
                                        style={{
                                            color:'#5c4033'
                                        }}
                                        >
                                            ${total}
                                        </span>
                                    </div>

                                    

                                    <button
                                        className="btn w-100 mb-3"
                                        style={{
                                            backgroundColor: '#5c4033',
                                            color: 'white',
                                            borderRadius: '14px',
                                            padding: '14px',
                                            border: 'none'
                                        }}
                                        onClick={finalizarCompra}
                                    >
                                        Finalizar Compra
                                    </button>


                                    <button
                                        className="btn w-100"
                                        style = {{
                                            backgroundColor: '#efe7dd',
                                            color: '#5c4033',
                                            borderRadius: '14px',
                                            padding: '14px',
                                            border: 'none'
                                        }}
                                        onClick={vaciarCarrito}
                                    >
                                        vaciar carrito
                                    </button>
                                    
                                </div>
                            </div>



                        </div>





                    </div>

                )
            }
        </div>
    );
}

export default Carrito;