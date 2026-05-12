const esAdmin = (req, res, next) => {
    if (req.usuario.rol !== "admin"){
        return res.status(403).json({
            message: "Acceso denegado"
        });
    }
    next();
};

export default esAdmin;