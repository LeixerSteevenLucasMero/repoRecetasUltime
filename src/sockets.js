import Receta from "./models/Receta";
import User from "./microservices/auth/models/user";

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo cliente connectado:", socket.id);

    // Send all messages to the client
    const emitRecetas = async () => {
      const recetas = await Receta.find();
      socket.emit("server:loadrecetas", recetas);
    };3
    emitRecetas();

    socket.on("client:newreceta", async (data) => {
      const newReceta = new Receta(data);
      const savedReceta = await newReceta.save();
      io.emit("server:newreceta", savedReceta);
    });

    socket.on("client:deletereceta", async (recetaId) => {
      await Receta.findByIdAndDelete(recetaId);
      emitRecetas();
    });

    socket.on("client:getreceta", async (recetaId) => {
      const receta = await Receta.findById(recetaId);
      socket.emit("server:selectedreceta", receta);
    });

    socket.on("client:updatereceta", async (updatedReceta) => {
      await Receta.findByIdAndUpdate(updatedReceta._id, {
        title: updatedReceta.title,
        description: updatedReceta.description,
      });
      emitRecetas();
    });
  });
};
