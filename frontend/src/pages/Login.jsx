import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';



function Login() {
    const navigate = useNavigate();

    const {login} = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {

        setFormData ({
            ...formData,
            [e.target.name]: e.target.value
        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch (
                "http://localhost:3000/api/auth/login",
                {
                    method: 'POST',

                    headers:{
                        'content-type': 'application/json'
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            console.log(data);

            // Guardar sesion
            login(data);

            // Redireccionar
            navigate('/');
            
        } catch (error){
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
                            Bienvenido
                        </h1>

                        <p
                        style={{
                            color: '#7a685d'
                        }}
                        >
                            Ingresá para continuar tu experiencia
                        </p>

                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                borderRadius: '14px',
                                padding: '14px',
                                border: '1px solid #e5ddd5'
                            }}
                            />

                        </div>

                        <div className="mb-4">

                            <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            className="form-control"
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
                            Ingresar
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;