import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:3000/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }

            );

            const data = await response.json();
            console.log(data);
            alert('Usuario registrado correctamente');
            navigate('/login');

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div
        className="d-flex justify-content-center align-items-center"
        style={{
            minHeight: '100vh',
            backgroundColor: '#f8f5f2',
            padding: '20px'
        }}
        >

            <div
            className="card border-0"
            style={{
                width: '100%',
                maxWidth: '450px',
                borderRadius: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                backgroundColor: 'white'
            }}
            >
                
                <div className="card-body p-5">

                    {/* TITULO */}
                    <div className="text-center mb-4">

                        <h1
                        className="fw-bold"
                        style={{
                            color: '#4b3429'
                        }}
                        >
                            Crear Cuenta
                        </h1>

                        <p
                        style={{
                            color: '#7a685d'
                        }}
                        >
                            Registrate para comenzar a comprar
                        </p>

                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className="form-control"
                            value={formData.nombre}
                            onChange={handleChange}
                            style={{
                                borderRadius: '14px',
                                padding: '14px',
                                border: '1px solid #e5ddd5'
                            }}
                            />

                        </div>

                        <div className="mb-3">

                            <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                borderRadius: '14px',
                                padding: '14px',
                                border: '1px solid #e5ddd5'
                            }}
                            />

                        </div>

                        <div className="mb-4">

                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                borderRadius: '14px',
                                padding: '14px',
                                border: '1px solid #e5ddd5'
                            }}
                            />

                        </div>

                        <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: '#5c4033',
                            color: 'white',
                            borderRadius: '14px',
                            padding: '14px',
                            border: 'none',
                            fontWeight: '600'
                        }}
                        >
                            Registrarse
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Register;