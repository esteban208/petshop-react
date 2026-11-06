import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { obtenerProductos, guardarProductos } from "../../data/productos";

function ProductosAdmin() {
  const [productos, setProductos] = useState(obtenerProductos());

  const eliminar = (codigo) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    const nuevaLista = productos.filter((p) => p.codigo !== codigo);
    setProductos(nuevaLista);     // actualiza la pantalla
    guardarProductos(nuevaLista); // actualiza localStorage
  };

  return (
    <div className="dashboard-body">
      <div className="admin-container">
        <SidebarAdmin />
        <main className="admin-main">
          <div className="dashboard-content">

            <div className="content-header">
              <div>
                <h1>Control de Productos</h1>
                <p>Visualiza, edita o administra el inventario y catálogo de la tienda.</p>
              </div>
              <Link to="/admin/productos/nuevo" className="btn-action-primary" style={{ textDecoration: "none" }}>
                <i className="fa-solid fa-plus"></i> Nuevo Producto
              </Link>
            </div>

            <div className="dashboard-section-card">
              <div className="section-card-header">
                <div>
                  <h2>Listado de Productos del Catálogo</h2>
                  <p>Productos registrados actualmente en el sistema.</p>
                </div>
              </div>

              <div className="table-responsive-container">
                <table className="pro-table">
                  <thead>
                    <tr>
                      <th>Código</th><th>Nombre</th><th>Precio</th>
                      <th>Stock</th><th>Categoría</th><th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => {
                      const stockBajo = p.stock <= p.stockCritico;
                      return (
                        <tr key={p.codigo}>
                          <td>{p.codigo}</td>
                          <td>{p.nombre}</td>
                          <td>${p.precio.toLocaleString("es-CL")}</td>
                          <td className={stockBajo ? "stock-critico" : ""}>
                            {p.stock} {stockBajo && "⚠️"}
                          </td>
                          <td>{p.categoria}</td>
                          <td>
                            <Link to={`/admin/productos/editar/${p.codigo}`}>Editar</Link>
                            <button className="btn-eliminar" onClick={() => eliminar(p.codigo)}>Eliminar</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductosAdmin;