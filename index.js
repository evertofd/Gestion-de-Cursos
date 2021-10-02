const express = require("express");
const app = express();
require('dotenv').config({path: '.env'})
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
app.listen(port, host, ()=> console.log("Nuestra aplicacion esta arriba"))

const {
  guardarCurso,
  getCursos,
  editCurso,
  deleteCurso,
} = require("./consultas");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/curso", async (req, res) => {
  const datos = Object.values(req.body);
  await guardarCurso(datos);
  res.send("Curso guardado");
});

app.get("/cursos", async (req, res) => {
  const cursos = await getCursos();
  res.send(cursos);
});

app.put("/curso", async (req, res) => {
  const datos = Object.values(req.body);
  await editCurso(datos);
  res.send("Curso Editado");
});

app.delete("/curso/:id", async (req, res) => {
  const { id } = req.params;
  await deleteCurso(id);
  res.send("Curso Eliminado");
});
