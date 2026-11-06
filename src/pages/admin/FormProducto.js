import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { obtenerProductos, guardarProductos } from "../../data/productos";

const formularioVacio = {
  codigo: "", nombre: "", descripcion: "", precio: "",
  stock: "", stockCritico: "", categoria: "", imagen: ""
};

function FormProducto() {
  const navigate = useNavigate();
  const { codigo: codigoEditar } = useParams();
  const esEdicion = codigoEditar !== undefined;
  const productos = obtenerProductos();

  const productoInicial = esEdicion
    ? productos.find((p) => p.codigo === codigoEditar) || formularioVacio
    : formularioVacio;

  const [form, setForm] = useState(productoInicial);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const err = {};
    const precio = parseFloat(form.precio);
    const stock = Number(form.stock);
    const stockCritico = form.stockCritico === "" ? 0 : Number(form.stockCritico);

    if (form.codigo.trim().length < 3) {
      err.codigo = "Mínimo 3 caracteres";
    } else if (productos.some((p) => p.codigo === form.codigo.trim() && p.codigo !== codigoEditar)) {
      err.codigo = "Ese código ya existe";
    }
    if (form.nombre.trim() === "" || form.nombre.length > 100) err.nombre = "Requerido, máximo 100 caracteres";
    if (form.descripcion.length > 500) err.descripcion = "Máximo 500 caracteres";
    if (isNaN(precio) || precio < 0) err.precio = "Precio inválido (mínimo 0)";
    if (form.stock === "" || stock < 0 || !Number.isInteger(stock)) err.stock = "Stock inválido (entero, mínimo 0)";
    if (stockCritico < 0 || !Number.isInteger(stockCritico)) err.stockCritico = "Debe ser un entero, mínimo 0";
    if (form.categoria === "") err.categoria = "Selecciona una categoría";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const productoNuevo = {
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: parseFloat(form.precio),
      stock: Number(form.stock),
      stockCritico: form.stockCritico === "" ? 0 : Number(form.stockCritico),
      categoria: form.categoria,
      imagen: form.imagen.trim() || "/img/sin-imagen.jpg"
    };

    const nuevaLista = esEdicion
      ? productos.map((p) => (p.codigo === codigoEditar ? productoNuevo : p))
      : [...productos, productoNuevo];

    guardarProductos(nuevaLista);
    alert("Producto guardado correctamente");
    navigate("/admin/productos");
  };

  return (
    <div className="dashboard-body">
      <div className="admin-container">
        <SidebarAdmin />
        <main className="admin-main">
          <div className="dashboard-content">

            <div className="encabezado-formulario">
              <div className="icono-encabezado">📦</div>
              <div className="texto-encabezado">
                <h1>{esEdicion ? "Editar producto" : "Nuevo producto"}</h1>
                <p>Completa los datos para registrar un producto en PetShop</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <details className="seccion-formulario" open>
                <summary>📦 Datos del producto</summary>
                <div className="grid-formulario">

                  <div className="campo">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" name="codigo" value={form.codigo}
                      onChange={handleChange} placeholder="Ej: ALM001" />
                    <span className="error">{errores.codigo}</span>
                  </div>

                  <div className="campo">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={form.nombre}
                      onChange={handleChange} maxLength={100} placeholder="Ingresa el nombre" />
                    <span className="error">{errores.nombre}</span>
                  </div>

                  <div className="campo campo-completo">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea id="descripcion" name="descripcion" value={form.descripcion}
                      onChange={handleChange} maxLength={500} placeholder="Ingresa la descripción" />
                    <span className="error">{errores.descripcion}</span>
                  </div>

                  <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange}>
                      <option value="">-- Selecciona --</option>
                      <option value="Alimentos">Alimentos</option>
                      <option value="Juguetes">Juguetes</option>
                      <option value="Higiene">Higiene</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                    <span className="error">{errores.categoria}</span>
                  </div>

                  <div className="campo">
                    <label htmlFor="imagen">Imagen (ruta)</label>
                    <input type="text" id="imagen" name="imagen" value={form.imagen}
                      onChange={handleChange} placeholder="Ej: /img/producto.jpg" />
                  </div>

                </div>
              </details>

              <details className="seccion-formulario" open>
                <summary>💲 Precio y stock</summary>
                <div className="grid-formulario">

                  <div className="campo">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" id="precio" name="precio" value={form.precio}
                      onChange={handleChange} min="0" placeholder="Ej: 25990" />
                    <span className="error">{errores.precio}</span>
                  </div>

                  <div className="campo">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" id="stock" name="stock" value={form.stock}
                      onChange={handleChange} min="0" placeholder="Ej: 40" />
                    <span className="error">{errores.stock}</span>
                  </div>

                  <div className="campo">
                    <label htmlFor="stockCritico">Stock crítico</label>
                    <input type="number" id="stockCritico" name="stockCritico" value={form.stockCritico}
                      onChange={handleChange} min="0" placeholder="Ej: 5" />
                    <span className="error">{errores.stockCritico}</span>
                  </div>

                </div>
              </details>

              <button type="submit" className="btn-action-primary">Guardar producto</button>
            </form>

          </div>
        </main>
      </div>
    </div>
  );
}

export default FormProducto;