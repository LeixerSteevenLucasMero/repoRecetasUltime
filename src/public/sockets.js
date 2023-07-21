const socket = io.connect();

/**
 * create a new receta
 * @param {string} title a title for a new receta
 * @param {string} description a description for a new receta
 */
export const saveReceta = (title, description) => {
  socket.emit("client:newreceta", {
    title,
    description,
  });
};

/**
 * delete a receta based on an Id
 * @param {string} id a receta ID
 */
export const deleteReceta = (id) => {
  socket.emit("client:deletereceta", id);
};

/**
 *
 * @param {string} id receta ID
 * @param {string} title receta title
 * @param {string} description receta description
 */
export const updateReceta = (_id, title, description) => {
  socket.emit("client:updatereceta", {
    _id,
    title,
    description,
  });
};

/**
 * Load an Array of Recetas
 * @param {function} callback A function to render Recetas
 */
export const loadRecetas = (callback) => {
  socket.on("server:loadrecetas", callback);
};

export const onNewReceta = (callback) => {
  socket.on("server:newreceta", callback);
};

export const onSelected = (callback) => {
  socket.on("server:selectedreceta", callback);
};

export const getRecetaById = (recetaId) => {
  socket.emit("client:getreceta", recetaId);
};
