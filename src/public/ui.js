import { deleteReceta, getRecetaById, saveReceta, updateReceta } from "./sockets.js";

const recetasList = document.querySelector("#recetas");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = "";

const recetaUI = (receta) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${receta.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${receta._id}">delete</button>
              <button class="btn btn-secondary update" data-id="${receta._id}">update</button>
          </div>
      </div>
      <p>${receta.description}</p>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteReceta(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getRecetaById(btnDelete.dataset.id));

  return div;
};

export const renderRecetas = (recetas) => {
  savedId = "";
  recetasList.innerHTML = "";
  recetas.forEach((receta) => recetasList.append(recetaUI(receta)));
};

export const appendReceta = (receta) => {
  recetasList.append(recetaUI(receta));
};

export const fillForm = (receta) => {
  title.value = receta.title;
  description.value = receta.description;

  savedId = receta._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (savedId) {
    updateReceta(savedId, title.value, description.value);
  } else {
    saveReceta(title.value, description.value);
  }

  title.value = "";
  description.value = "";
};