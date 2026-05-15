import express from "express";
import cors from "cors";

import productosRoutes from "./routes/productos.routes.js";
import authRoutes from "./routes/auth.routes.js"; 
import carritoRoutes from "./routes/carrito.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/api/productos", productosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carrito", carritoRoutes);


export default app;