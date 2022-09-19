import path from 'path';
import express from 'express';
import { FachadaAcessoService } from './controladores/fachada';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const fachada: FachadaAcessoService = new FachadaAcessoService();

app.set("view engine", "ejs");
app.set('views', [path.join(__dirname,'views')]);

app.post("/cadastro", (req, res) => fachada.registrar(req, res));

app.post('/loginexterno', (req, res) => fachada.loginExterno(req, res));

app.post('/login', (req, res) => fachada.login(req, res));

// Authentication middleware applied to the following routes
app.use((req, res, next) => fachada.authenticate(req, res, next));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
