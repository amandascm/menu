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
import { Sessao } from "../entidades/sessao";

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

    authenticate(req: Request, res: Response) {
        const {accesstoken} = req.body;
        const contaId = this.controladorLogin.authenticate(accesstoken);
        if(contaId) {
            return res.status(202).send({contaId});
        }
        else {
            return res.status(401).send({ message: "Unauthorized" })
        }
    }

    getCliente(req: Request, res: Response) {
        const {name, email} = req.body;
        const contaId = this.controladorLogin.getCliente(email, name);
        return res.status(200).send({contaId});
    }

    registrarSessao(req: Request, res: Response) {
        const {token, contaId, tipoConta} = req.body;
        let s = new Sessao(token, tipoConta, contaId);
        s = this.controladorLogin.registrarSessao(s);
        return res.status(201).send({ token: s.getToken() });
    }
}