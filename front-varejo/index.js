// Bibliotecas e módulos utilizados
const express = require("express");
const app = express();
const hand = require("express-handlebars");
const cookieParser = require("cookie-parser");

const Services = require("./services/services");
const routes = require("./routes/routes");

app.engine("handlebars", hand.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended : true,}));
app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

app.listen(3000);