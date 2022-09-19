import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { Restaurante } from "../entidades/restaurante";
import { ControladorCadastro } from "./controladorCadastro";
import { ControladorLogin } from "./controladorLogin";
import { FactoryRepositorioOO } from "../cadastros/factoryRepositorioOO";
import { AbstractFactoryRepositorio } from "../cadastros/abstractFactoryRepositorio";
import { Cliente } from "../entidades/cliente";
import { CadastroSessao } from "../cadastros/cadastroSessao";
import { Request, Response } from "express";
import { Endereco } from "../entidades/endereco";

const config = {
    "FACTORY_REPOSITORIOS": FactoryRepositorioOO
}

export class FachadaAcessoService {
    controladorCadastro: ControladorCadastro;
    controladorLogin: ControladorLogin;

    constructor() {
        const factoryRepositorios = new config['FACTORY_REPOSITORIOS']() as AbstractFactoryRepositorio;
        const repositorioRestaurantes = factoryRepositorios.createRepositorioRestaurantes();
        const repositorioClientes = factoryRepositorios.createRepositorioClientes();
        const repositorioSessao = factoryRepositorios.createRepositorioSessao();

        const cadastroRestaurante = new CadastroRestaurante(repositorioRestaurantes);
        const cadastroCliente = new CadastroCliente(repositorioClientes);
        const cadastroSessao = new CadastroSessao(repositorioSessao);

        this.controladorCadastro = new ControladorCadastro(cadastroRestaurante, cadastroCliente);
        this.controladorLogin = new ControladorLogin(cadastroSessao, cadastroCliente, cadastroRestaurante);
    }

    registrar(req: Request, res: Response) {
        const accountType = req.query.accounttype;
        if(accountType === "restaurante") {
            const {name, email, password, rua, bairro, cep, numero, telefone} = req.body;
            const endereco = new Endereco(rua, cep, bairro, numero);
            return res.send({ id: this.controladorCadastro.registrarRestaurante(new Restaurante(0, email, password, name, endereco, telefone)) });
        }
        else if(accountType === "cliente") {
            const {name, email, password, rua, bairro, cep, numero} = req.body;
            const endereco = new Endereco(rua, cep, bairro, numero);
            return res.send({ id: this.controladorCadastro.registrarCliente(new Cliente(0, email, password, name, endereco)) })
        }
        res.status(404);
        return res.send({ message: "Falha no cadastro" });
    }

    loginExterno(req: Request, res: Response) {
        const {jwtToken, clientId} = req.body;
        this.controladorLogin.loginExterno(jwtToken, clientId).then(token => {
            if(token) {
                return res.send({ token: token });
            }
            else {
                res.status(404);
                return res.send({ message: "Falha no login" })
            }
        }).catch((e) => {
            res.status(404);
            return res.send({ message: "Falha no login" })
        })
    }

    login(req: Request, res: Response) {
        const {email, password} = req.body;
        const accountType = req.query.accounttype === 'cliente' ? 'cliente' : 'restaurante';
        const token = this.controladorLogin.login(email, password, accountType);
        if(token) {
            return res.send({ token: token });
        }
        res.status(404);
        return res.send({ message: "Falha no login" })
    }

    authenticate(req: Request, res: Response, next: any) {
        const accesstoken = req.cookies['accesstoken'] ?? '';
        const contaId = this.controladorLogin.authenticate(accesstoken);
        if(contaId) {
            res.locals.contaId = contaId;
            next();
        }
        else {
            res.status(401);
            return res.send({ message: "Unauthorized" })
        }
    }
}