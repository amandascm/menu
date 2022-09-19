import path from 'path';
import express from 'express';
import { Fachada } from './controladores/fachada';
import { TelaCadastroControle } from './controllers/telaCadastroControle';
import { TelaLoginControle } from './controllers/telaLoginControle';
import { TelaCardapioRestauranteControle } from './controllers/telaCardapioRestauranteControle';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const fachada: Fachada = new Fachada();
const telaCadastroControle: TelaCadastroControle = new TelaCadastroControle(fachada);
const telaLoginControle: TelaLoginControle = new TelaLoginControle(fachada);
const telaCardapioRestauranteControle: TelaCardapioRestauranteControle = new TelaCardapioRestauranteControle(fachada);

app.set("view engine", "ejs");
app.set('views', [path.join(__dirname,'views')]);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/cadastro", function(req, res) {
  res.render("telaCadastro", {mensagem: ''});
})

app.get("/login", function(req, res) {
  res.render("telaLogin", {mensagem: ''})
})

app.post("/cadastro", (req, res) => telaCadastroControle.registrar(req, res));

app.post('/loginexterno', (req, res) => telaLoginControle.loginExterno(req, res));

app.post('/login', (req, res) => telaLoginControle.login(req, res));

// Authentication middleware applied to the following routes
app.use((req, res, next) => telaLoginControle.authenticate(req, res, next))

app.get('/restaurante', (req, res) => res.render('welcome-restaurante'));

app.get("/restaurante/cardapio", (req, res) => telaCardapioRestauranteControle.visualizarCardapio(req, res));

app.post("/restaurante/cardapio/delete", (req, res) => telaCardapioRestauranteControle.removerItemCardapio(req, res));

app.post("/restaurante/cardapio/add", (req, res) => telaCardapioRestauranteControle.adicionarItemCardapio(req, res));

app.get("/restaurante/cardapio/add", (req, res) => res.render("partials/newItem"));

app.post('/restaurante/cardapio/update-template', (req, res) => telaCardapioRestauranteControle.getAtualizarItemTemplate(req, res));

app.post('/restaurante/cardapio/update', (req, res) => telaCardapioRestauranteControle.atualizarItemCardapio(req, res));

app.get('/cliente', (req, res) => res.render('welcome-cliente'));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
