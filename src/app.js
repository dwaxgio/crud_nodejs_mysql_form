const express = require("express");
const path = require("path"); // módulo para cargar directorios
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const app = express();

// IMPORTANDO RUTAS
const customerRoutes = require("./routes/customer");
const { urlencoded } = require("express");

// SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs"); //Motor de plantillas para vistas
app.set("views", path.join(__dirname, "views")); // indica ruta de código

// MIDDEWARES (son funciones)
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "crudnodejsmysql",
    },
    "single"
  )
);
app.use(express.urlencoded({ extend: false })); // desde modulo de expres, se usa metodo para interpretar datos que viene de formulario

// RUTAS (PETICIONES O RUTAS DE SERVIDOR)
app.use("/", customerRoutes);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// EMPEZANDO EL SERVIDOR
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
