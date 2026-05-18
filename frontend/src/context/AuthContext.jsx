import { 
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');

        if (usuarioGuardado) {
            setUsuario(
                JSON.parse(usuarioGuardado)
            );
        }
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);

        localStorage.setItem (
            'usuario',
            JSON.stringify(data.usuario)
        );

        setUsuario(data.usuario);
    };

    const logout = () => {
        localStorage.removeItem('token');

        localStorage.removeItem('usuario');

        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value = {{
                usuario,
                login,
                logout
            }}>
            {children}

        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext);
}
