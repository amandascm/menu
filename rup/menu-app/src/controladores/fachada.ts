import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { Restaurante } from "../entidades/restaurante";
import { ControladorCadastro } from "./controladorCadastro";
import { ControladorLogin } from "./controladorLogin";
import { FactoryRepositorioOO } from "../cadastros/factoryRepositorioOO";
import { AbstractFactoryRepositorio } from "../cadastros/abstractFactoryRepositorio";
import { Cliente } from "../entidades/cliente";
import { CadastroSessao } from "../cadastros/cadastroSessao";

const config = {
    "FACTORY_REPOSITORIOS": FactoryRepositorioOO
}

export class Fachada {
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
        this.controladorLogin = new ControladorLogin(cadastroSessao, cadastroCliente);
    }

    registrarRestaurante(r: Restaurante): boolean {
        return this.controladorCadastro.registrarRestaurante(r);
    }

    registrarCliente(c: Cliente): boolean {
        return this.controladorCadastro.registrarCliente(c);
    }

    loginExterno(): number {
        return this.controladorLogin.loginExterno();
    } 
}