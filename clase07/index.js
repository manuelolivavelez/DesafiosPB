const express = require('express');
const Contenedor = require('./contenedor');

const contenedor = new Contenedor('./productos.txt')
const app = express();

const PORT = 3005 || process.env.PORT;

app.get('/productos', async (req,res) => {
      res.send(await contenedor.getAll());
});

app.get('/productoRandom', async (req,res) => {
      res.send(await contenedor.getRandomItem());
})
const server = app.listen(PORT, () => {
      console.log(`El servidor se encuentra escuchando por el puerto ${server.address().port}`)
});

server.on("Error", error => console.log(`Error en servidor ${error}`));