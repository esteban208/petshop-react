import { Link, useNavigate } from "react-router-dom";

function SidebarAdmin() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <img src="/img/logo.jpg" alt="Logo PetShop" className="brand-logo" />
        <span className="brand-name">PetShop <span>Admin</span></span>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li className="menu-category">Menú Principal</li>
          <li><Link to="/admin"><i className="fa-solid fa-chart-pie"></i> Dashboard</Link></li>
          <li className="active"><Link to="/admin/productos"><i className="fa-solid fa-box-open"></i> Productos</Link></li>
          <li className="menu-category">Gestión</li>
          <li><Link to="/admin/usuarios"><i className="fa-solid fa-user-gear"></i> Usuarios y Roles</Link></li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout-pro" onClick={cerrarSesion}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default SidebarAdmin;