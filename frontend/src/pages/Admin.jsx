
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Admin() {

    const { usuario } = useAuth();  

    const [formData, setFormData] = useState ({
        nombre: '',
        imagen: '',
        descripcion: '',
        categoria: '',
        precio: 0,
        stock: 0
    })

    const [productos, setProductos] = useState([]);

    const [editandoId, setEditandoId] = useState(null);

    const obtenerProductos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/productos');

            const data = await response.json();

            setProductos(data);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch (
                `http://localhost:3000/api/productos/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            console.log(data);
            obtenerProductos();
        } catch (error) {
            console.log(error);
        }
    };

    const cargarProducto = (producto) => {
        setFormData ({
            nombre: producto.nombre,
            imagen: producto.imagen,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            precio: producto.precio,
            stock: producto.stock
        });

        setEditandoId(producto._id);
    }

    useEffect(() => {
        obtenerProductos();
    }, []);

    if (!usuario || usuario.rol !== 'admin'){
        return <h1>Acceso denegado</h1>;
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token= localStorage.getItem('token');

            const response = await fetch(
                editandoId
                    ? `http://localhost:3000/api/productos/${editandoId}`
                    : 'http://localhost:3000/api/productos',
                {
                    method: editandoId ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();
            console.log(data);

            alert('Producto creado exitosamente');

            setFormData({

                nombre: '',
                imagen: '',
                descripcion: '',
                categoria: '',
                precio: 0,
                stock: 0
            });

            setEditandoId(null);

            obtenerProductos();
        } catch(error) {
            console.log(error);
        }
    };


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

            {/* TITULO */}
            <div className="mb-5">

                <h1
                className="fw-bold"
                style={{
                    color: '#4b3429'
                }}
                >
                    Panel de Administración
                </h1>

                <p
                style={{
                    color: '#7a685d'
                }}
                >
                    Gestioná los productos de tu tienda
                </p>

            </div>

            <div className="row g-4">

                {/* FORMULARIO */}
                <div className="col-lg-4">

                    <div
                    className="card border-0"
                    style={{
                        borderRadius: '25px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                    }}
                    >

                        <div className="card-body p-4">

                            <h4
                            className="fw-bold mb-4"
                            style={{
                                color: '#4b3429'
                            }}
                            >
                                {
                                    editandoId
                                        ? 'Editar producto'
                                        : 'Crear producto'
                                }
                            </h4>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <input
                                    type="text"
                                    name='nombre'
                                    placeholder='Nombre'
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                    type="text"
                                    name="imagen"
                                    placeholder="URL imagen"
                                    value={formData.imagen}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                    />

                                </div>

                                <div className="mb-3">

                                    <textarea
                                    name='descripcion'
                                    placeholder='Descripción'
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="3"
                                    style={{
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                    type="text"
                                    name='categoria'
                                    placeholder='Categoría'
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        padding: '12px'
                                    }}
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-6 mb-3">

                                        <input
                                        type="number"
                                        name='precio'
                                        placeholder='Precio'
                                        value={formData.precio}
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{
                                            borderRadius: '12px',
                                            padding: '12px'
                                        }}
                                        />

                                    </div>

                                    <div className="col-6 mb-3">

                                        <input
                                        type="number"
                                        name='stock'
                                        placeholder='Stock'
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{
                                            borderRadius: '12px',
                                            padding: '12px'
                                        }}
                                        />

                                    </div>

                                </div>

                                <button
                                type='submit'
                                className="btn w-100"
                                style={{
                                    backgroundColor: '#5c4033',
                                    color: 'white',
                                    borderRadius: '14px',
                                    padding: '12px',
                                    border: 'none'
                                }}
                                >
                                    {
                                        editandoId
                                            ? 'Guardar cambios'
                                            : 'Crear producto'
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

                {/* PRODUCTOS */}
                <div className="col-lg-8">

                    <div className="row g-4">

                        {
                            productos.map((producto) => (

                                <div
                                key={producto._id}
                                className="col-md-6"
                                >

                                    <div
                                    className="card h-100 border-0"
                                    style={{
                                        borderRadius: '25px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                                    }}
                                    >

                                        <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        style={{
                                            height: '220px',
                                            objectFit: 'cover'
                                        }}
                                        />

                                        <div className="card-body p-4">

                                            <h4
                                            className="fw-bold"
                                            style={{
                                                color: '#4b3429'
                                            }}
                                            >
                                                {producto.nombre}
                                            </h4>

                                            <p
                                            style={{
                                                color: '#7a685d'
                                            }}
                                            >
                                                {producto.descripcion}
                                            </p>

                                            <p
                                            className="fw-bold fs-5"
                                            style={{
                                                color: '#5c4033'
                                            }}
                                            >
                                                ${producto.precio}
                                            </p>

                                            <div className="d-flex gap-2 mt-3">

                                                <button
                                                className="btn flex-fill"
                                                style={{
                                                    backgroundColor: '#efe7dd',
                                                    color: '#5c4033',
                                                    borderRadius: '12px',
                                                    border: 'none'
                                                }}
                                                onClick={() => cargarProducto(producto)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                className="btn flex-fill"
                                                style={{
                                                    backgroundColor: '#5c4033',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    border: 'none'
                                                }}
                                                onClick={() => eliminarProducto(producto._id)}
                                                >
                                                    Eliminar
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;