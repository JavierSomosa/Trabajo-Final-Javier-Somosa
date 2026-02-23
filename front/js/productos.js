// Mostrar saludo con el nombre guardado
const nombre = localStorage.getItem("nombreCliente");

if (!nombre) {
    // Si no hay nombre, volvemos al inicio
    window.location.href = "index.html";
}

document.getElementById("saludo").innerText =
    `Hola ${nombre}, elegí tus productos`;

// Traer productos desde la API
fetch("http://localhost:3000/api/productos")
    .then(response => response.json())
    .then(productos => {

        const contenedor = document.getElementById("contenedor-productos");

        // Filtramos solo los activos (por seguridad extra)
        const productosActivos = productos.filter(p => p.activo);

        productosActivos.forEach(producto => {

            const card = document.createElement("div");
            card.classList.add("card-producto");

            card.innerHTML = `
                <img src="http://localhost:3000/uploads/${producto.imagen}" width="150">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">
                    Agregar al carrito
                </button>
            `;

            contenedor.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
    });


// Función temporal (carrito lo hacemos después)
function agregarAlCarrito(id) {
    alert("Producto agregado (lo implementamos en el próximo paso)");
}
