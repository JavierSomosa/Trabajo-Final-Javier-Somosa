const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID recibido:", id);

fetch(`/api/productos/${id}`)
.then(res => {
    if (!res.ok) {
        throw new Error("No se pudo obtener el producto");
    }
    return res.json();
})
.then(producto => {

    console.log("Producto recibido:", producto);

    const contenedor = document.getElementById("detalle");

    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado</p>";
        return;
    }

    const precioNumero = Number(producto.precio);

    contenedor.innerHTML = `
        <img src="/uploads/${producto.imagen}" width="200">
        <h2>${producto.nombre}</h2>
        <p><strong>Precio:</strong> $${precioNumero.toLocaleString()}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
    `;
})
.catch(error => {
    console.error("Error:", error);
    document.getElementById("detalle").innerHTML =
        "<p>Error al cargar el producto</p>";
});