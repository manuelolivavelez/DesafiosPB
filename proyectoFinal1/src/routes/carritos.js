const express = require("express");

const { Router } = express;

const router = new Router();

const Cart = require("../containers/carritos");
const cart = new Cart();
const Product = require("../containers/productos");
const product = new Product();

router.post("/", async (req, res) => {
  await cart.save(req.body);
  res.send("Carrito creado con exito");
});

router.delete("/:id", async (req, res) => {
  await cart.delete(req.params.id);
  res.send(`El carrito con ID ${req.params.id} se ha borrado con exito`);
});

router.get("/", async (req, res) => {
  res.send(await cart.getAll());
});

router.post("/:id/productos", async (req, res) => {
  await cart.update(req.params.id, req.body);
  res.send("Producto agregado al carrito");
});

router.get("/:id/productos", async (req, res) => {
  res.send(await cart.getProducts(req.params.id));
});

router.delete("/:id/productos/:idProd", async (req, res) => {
  await cart.deleteProduct(req.params.id, req.params.idProd);
  res.send("Producto eliminado del carrito");
});

module.exports = router;