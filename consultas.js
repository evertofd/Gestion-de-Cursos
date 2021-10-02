const { Pool } = require("pg");
require('dotenv').config({path: '.env'})
const pool = new Pool({
  user: process.env.BD_USER,
  host: process.env.HOST,
  password:process.env.BD_PASS ,
  database: process.env.BD_NOMBRE,
  port: process.env.BD_PORT,
  ssl:{
    rejectUnauthorized: false
  }
});

async function guardarCurso(curso) {
  curso[1] = Number(curso[1]);
  curso[3] = Number(curso[3]);

  const consulta = {
    text:
      "INSERT INTO cursos (nombre, nivel, fecha, duracion) values ( $1, $2, $3, $4)",
    values: curso,
  };
  try {
    const result = await pool.query(consulta);
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function getCursos() {
  try {
    const result = await pool.query(`SELECT * FROM cursos`);
    return result.rows;
  } catch (e) {
    return e;
  }
}

async function deleteCurso(id) {
  try {
    const result = await pool.query(
      `DELETE FROM cursos WHERE id = '${id}'`
    );
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function editCurso(curso) {
  const consulta = {
    text:
      "UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE nombre = $1 RETURNING *",
    values: curso,
  };
  try {
    const res = await pool.query(consulta);
    return res.rows;
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  guardarCurso,
  getCursos,
  editCurso,
  deleteCurso,
};
