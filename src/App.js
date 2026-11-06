import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import FormProducto from "./pages/admin/FormProducto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/productos" />} />
        <Route path="/admin/productos" element={<ProductosAdmin />} />
        <Route path="/admin/productos/nuevo" element={<FormProducto />} />
        <Route path="/admin/productos/editar/:codigo" element={<FormProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;