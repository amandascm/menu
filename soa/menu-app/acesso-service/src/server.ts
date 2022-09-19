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

app.post("/cadastro", (req, res) => fachada.registrar(req, res));

app.post('/loginexterno', (req, res) => fachada.loginExterno(req, res));

app.post('/login', (req, res) => fachada.login(req, res));

app.post('/verificartoken', (req, res) => fachada.authenticate(req, res));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
