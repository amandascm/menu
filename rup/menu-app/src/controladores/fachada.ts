import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { RepositorioRestaurantesOO } from "../cadastros/repositorioRestaurantesOO";
import { Restaurante } from "../entidades/restaurante";
import { ControladorCadastro } from "./controladorCadastro";

export class Fachada {
    controladorCadastro: ControladorCadastro;

    constructor() {
        const repositorioRestaurantes = new RepositorioRestaurantesOO();
        const cadastroRestaurante = new CadastroRestaurante(repositorioRestaurantes);
        this.controladorCadastro = new ControladorCadastro(cadastroRestaurante);
    }

    registrarRestaurante(r: Restaurante): boolean {
        return this.controladorCadastro.registrarRestaurante(r);
    }
}