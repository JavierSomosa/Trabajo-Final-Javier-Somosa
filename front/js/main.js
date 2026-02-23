const boton = document.getElementById("btnContinuar");

boton.addEventListener("click", function () {

    const nombre = document.getElementById("nombre").value.trim();

    if (!nombre) {
        alert("Ingrese su nombre");
        return;
    }

    localStorage.setItem("nombreCliente", nombre);

    window.location.href = "productos.html";
});