import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { Restaurante } from "../entidades/restaurante";
import { ControladorCadastro } from "./controladorCadastro";
import { ControladorLogin } from "./controladorLogin";
import { FactoryRepositorioOO } from "../cadastros/factoryRepositorioOO";
import { AbstractFactoryRepositorio } from "../cadastros/abstractFactoryRepositorio";
import { Cliente } from "../entidades/cliente";
import { CadastroSessao } from "../cadastros/cadastroSessao";
import { CadastroCardapio } from "../cadastros/cadastroCardapio";
import { ControladorCardapio } from "./controladorCardapio";
import { Item } from "../entidades/item";

const config = {
    "FACTORY_REPOSITORIOS": FactoryRepositorioOO
}

export class Fachada {
    controladorCadastro: ControladorCadastro;
    controladorLogin: ControladorLogin;
    controladorCardapio: ControladorCardapio;

    constructor() {
        const factoryRepositorios = new config['FACTORY_REPOSITORIOS']() as AbstractFactoryRepositorio;
        const repositorioRestaurantes = factoryRepositorios.createRepositorioRestaurantes();
        const repositorioClientes = factoryRepositorios.createRepositorioClientes();
        const repositorioSessao = factoryRepositorios.createRepositorioSessao();
        const repositorioCardapios = factoryRepositorios.createRepositorioCardapios();

        const cadastroRestaurante = new CadastroRestaurante(repositorioRestaurantes);
        const cadastroCliente = new CadastroCliente(repositorioClientes);
        const cadastroSessao = new CadastroSessao(repositorioSessao);
        const cadastroCardapio = new CadastroCardapio(repositorioCardapios);

        this.controladorCadastro = new ControladorCadastro(cadastroRestaurante, cadastroCliente, cadastroCardapio);
        this.controladorLogin = new ControladorLogin(cadastroSessao, cadastroCliente, cadastroRestaurante);
        this.controladorCardapio = new ControladorCardapio(cadastroCardapio);
    }

    visualizarCardapio(restId: number) {
        return this.controladorCardapio.getItensCardapio(restId);
    }

    getItemCardapio(restId: number, nomeItem: string) {
        return this.controladorCardapio.getItemCardapio(restId, nomeItem);
    }

    registrarRestaurante(r: Restaurante): boolean {
        return this.controladorCadastro.registrarRestaurante(r);
    }

    registrarCliente(c: Cliente): boolean {
        return this.controladorCadastro.registrarCliente(c);
    }

    loginExterno(jwtToken: string, clientId: string): Promise<string> {
        return this.controladorLogin.loginExterno(jwtToken, clientId);
    }

    deleteItemCardapio(restId: number, nomeItem: string): boolean {
        return this.controladorCardapio.deleteItemCardapio(restId, nomeItem);
    }

    addItemCardapio(restId: number, item: Item): Item | undefined {
        return this.controladorCardapio.addItemCardapio(restId, item);
    }

    public updateItemCardapio(restId: number, nomeItem: string, item: Item) {
        return this.controladorCardapio.updateItemCardapio(restId, nomeItem, item);
    }
}