import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function Navbar(){
    const { usuario, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">

            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    Home
                </Link>
                <div className='d-flex align-items-center gap-4'>
                    {
                        usuario && (
                            <Link to="/carrito" className="nav-link fw-semibold">
                                Carrito
                            </Link>
                        )
                    }

                    {
                        usuario?.rol === 'admin' && (
                            <Link to="/admin" className="nav-link fw-semibold">
                                Admin
                            </Link>
                        )
                    }

                    {
                        usuario ? (
                            <button 
                            onClick={logout}
                            className='btn btn-danger px-4'>
                                Logout
                            </button>
                        ) : (
                            <div className='d-flex gap-2'>
                                <Link 
                                to="/login" 
                                className="btn btn-outline-dark px-4">
                                    Login
                                </Link>

                                <Link 
                                to="/register" 
                                className="btn btn-dark px-4">
                                    Register
                                </Link>
                            </div>
                        )
                    }    
                </div>    
            </div>  
            

        </nav>
    );
}

export default Navbar;