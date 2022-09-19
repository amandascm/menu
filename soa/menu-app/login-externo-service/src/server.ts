import express from 'express';
import { FachadaLoginExternoService } from './controladores/fachada';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const fachada: FachadaLoginExternoService = new FachadaLoginExternoService();

app.post('/loginexterno', (req, res) => fachada.loginExterno(req, res));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
