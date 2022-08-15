import path from 'path';
import express from 'express';
import { Fachada } from '../controladores/fachada';
import { TelaCadastroControle } from './telaCadastroControle';
import bodyParser from "body-parser";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const fachada: Fachada = new Fachada();
const telaCadastroControle: TelaCadastroControle = new TelaCadastroControle(fachada);

app.set("view engine", "ejs");
app.set('views', [path.join(__dirname,'../views')]);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/cadastro", function(req, res) {
    res.render("register", {mensagem: ''});
})

app.post("/cadastro", function(req, res) {
    return telaCadastroControle.registrar(req, res);
})

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
