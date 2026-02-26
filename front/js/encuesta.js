document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal");
  const btnEnviar = document.getElementById("btnEnviar");
  const form = document.getElementById("formEncuesta");

  modal.style.display = "none";

  btnEnviar.addEventListener("click", async () => {

    console.log("CLICK");

    try {

      const formData = new FormData(form);

      const res = await fetch("http://localhost:3000/api/encuestas", {
        method: "POST",
        body: formData
      });

      console.log("STATUS:", res.status);

      if (!res.ok) {
        const text = await res.text();
        console.log("RESPUESTA ERROR:", text);
        alert("Error del servidor");
        return;
      }

      console.log("MOSTRANDO MODAL");
      modal.style.display = "flex";

    } catch (error) {
      console.log("ERROR FETCH:", error);
    }

  });

});

function omitir() {
  window.location.href = "index.html";
}

function volverInicio() {
  localStorage.removeItem("carrito");
  window.location.href = "index.html";
}