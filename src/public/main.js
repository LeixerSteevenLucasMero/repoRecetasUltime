import { appendReceta, renderRecetas, fillForm, onHandleSubmit } from "./ui.js";
import { loadRecetas, onNewReceta, onSelected } from "./sockets.js";

// Verificar token al cargar una ruta
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Si no se encuentra un token, redirigir al login
  if (!token && window.location.pathname !== "/views/login.html") {
    window.location.href = "/views/login.html";
  } else {
    loadRecetas(renderRecetas);
    onNewReceta(appendReceta);
    onSelected(fillForm);
  }
});

// Save a new Receta
const recetaForm = document.querySelector("#recetaForm");
recetaForm.addEventListener("submit", onHandleSubmit);
