import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
    try {
        const {nombre, email, password} = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                message: "El usuario ya existe"
            });
        }

        // hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoUsuario = new Usuario({
            nombre, 
            email,
            password: passwordHash
        });

        await nuevoUsuario.save();

        res.status(201).json({
            message: "Usuario registrado"
        })
    } catch(error){
        res.status(500).json({
            message: "Error al registrar el usuario",
            error
        })
    }

};

// LOGIN
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Buscar usuario
        const usuario = await Usuario.findOne({ email });

        if(!usuario) {
            return res.status(400).json({
                message: "Usuario no encontrado"
            });
        }


        // Comparar password 
        const passwordCorrecta = await bcrypt.compare(
            password, 
            usuario.password
        )
        if(!passwordCorrecta) {
            return res.status(400).json({
                message: "Credenciales invalidas"
            });
        }

        // Generar token
        const token = jwt.sign(
            {
                id: usuario._id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json ({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error
        });
    }
};