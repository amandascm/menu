import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { RepositorioRestaurantesOO } from "../cadastros/repositorioRestaurantesOO";
import { Restaurante } from "../entidades/restaurante";
import { ControladorCadastro } from "./controladorCadastro";
import { FactoryRepositorioOO } from "../cadastros/factoryRepositorioOO";
import { AbstractFactoryRepositorio } from "../cadastros/abstractFactoryRepositorio";

const config = {
    "FACTORY_REPOSITORIOS": FactoryRepositorioOO
}

export class Fachada {
    controladorCadastro: ControladorCadastro;

    constructor() {
        const factoryRepositorios = new config['FACTORY_REPOSITORIOS']() as AbstractFactoryRepositorio;
        const repositorioRestaurantes = factoryRepositorios.createRepositorioRestaurantes();
        const cadastroRestaurante = new CadastroRestaurante(repositorioRestaurantes);
        this.controladorCadastro = new ControladorCadastro(cadastroRestaurante);
    }

    registrarRestaurante(r: Restaurante): boolean {
        return this.controladorCadastro.registrarRestaurante(r);
    }
}