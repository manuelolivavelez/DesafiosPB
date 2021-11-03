const express = require("express");
const Contenedor = require("../contenedor");
const { Router } = express;

const router = new Router();
const c = new Contenedor();

router.get("/", (req, res) => {
  c.getAll().then((data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  c.getById(req.params.id)
    .then((data) => {
      if (!data) {
        res.send(`El producto no existe`);
      }
      res.json(data);
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/", (req, res) => {
  c.save(req.body).then((data) => {
    res.send(data);
  });
});

router.put("/:id", (req, res) => {
  c.updateById(req.params.id, req.body);
  res.send(`El producto se ha actualizado exitosamente`);
});

router.delete("/:id", (req, res) => {
  c.deleteById(req.params.id);
  res.send(`El producto se ha eliminado exitosamente`);
});

module.exports = router;