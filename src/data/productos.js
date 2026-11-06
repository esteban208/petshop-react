const productosPorDefecto = [
  {
    codigo: "ALM001",
    nombre: "Alimento para perro Adulto 15kg",
    descripcion: "Alimento balanceado para perros adultos de todas las razas.",
    precio: 25990, stock: 40, stockCritico: 5,
    categoria: "Alimentos", imagen: "/img/alimentos.jpg"
  },
  {
    codigo: "JUG002",
    nombre: "Pelota de goma para perro",
    descripcion: "Pelota resistente, ideal para juegos de buscar.",
    precio: 4990, stock: 15, stockCritico: 3,
    categoria: "Juguetes", imagen: "/img/pelota.jpg"
  }
];

export function obtenerProductos() {
  const guardados = JSON.parse(localStorage.getItem("productos"));
  if (guardados) return guardados;
  guardarProductos(productosPorDefecto);
  return productosPorDefecto;
}

export function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}
