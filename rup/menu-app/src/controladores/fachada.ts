import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { Restaurante } from "../entidades/restaurante";
import { ControladorCadastro } from "./controladorCadastro";
import { FactoryRepositorioOO } from "../cadastros/factoryRepositorioOO";
import { AbstractFactoryRepositorio } from "../cadastros/abstractFactoryRepositorio";
import { Cliente } from "../entidades/cliente";

const config = {
    "FACTORY_REPOSITORIOS": FactoryRepositorioOO
}

export class Fachada {
    controladorCadastro: ControladorCadastro;

    constructor() {
        const factoryRepositorios = new config['FACTORY_REPOSITORIOS']() as AbstractFactoryRepositorio;
        const repositorioRestaurantes = factoryRepositorios.createRepositorioRestaurantes();
        const repositorioClientes = factoryRepositorios.createRepositorioClientes();

        const cadastroRestaurante = new CadastroRestaurante(repositorioRestaurantes);
        const cadastroCliente = new CadastroCliente(repositorioClientes);

        this.controladorCadastro = new ControladorCadastro(cadastroRestaurante, cadastroCliente);
    }

    registrarRestaurante(r: Restaurante): boolean {
        return this.controladorCadastro.registrarRestaurante(r);
    }

    registrarCliente(c: Cliente): boolean {
        return this.controladorCadastro.registrarCliente(c);
    }
}