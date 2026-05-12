import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
    try {
        // Obtener header
        const authHeader = req.headers.authorization;

        // Verificar si existe
        if(!authHeader){
            return res.status(401).json({
                message: "No autorizado"
            });
        }

        // Separar Bearer del token
        const token = authHeader.split(" ")[1];

        // Verificar token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardar usuario en request
        req.usuario = decoded;

        next();
    } catch(error) {
        res.status(401).json({
            message: "Token invalido",
            error
        });
    }
};

export default verificarToken;