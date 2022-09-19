import { FactoryRepositorioOO } from "../cadastros/factoryRepositorioOO";
import { AbstractFactoryRepositorio } from "../cadastros/abstractFactoryRepositorio";
import { CadastroCardapio } from "../cadastros/cadastroCardapio";
import { ControladorCardapio } from "./controladorCardapio";
import { Item } from "../entidades/item";

const config = {
    "FACTORY_REPOSITORIOS": FactoryRepositorioOO
}

export class Fachada {
    controladorCardapio: ControladorCardapio;

    constructor() {
        const factoryRepositorios = new config['FACTORY_REPOSITORIOS']() as AbstractFactoryRepositorio;
        const repositorioCardapios = factoryRepositorios.createRepositorioCardapios();

        const cadastroCardapio = new CadastroCardapio(repositorioCardapios);

        this.controladorCardapio = new ControladorCardapio(cadastroCardapio);
    }

    visualizarCardapio(restId: number) {
        return this.controladorCardapio.getItensCardapio(restId);
    }

    getItemCardapio(restId: number, nomeItem: string) {
        return this.controladorCardapio.getItemCardapio(restId, nomeItem);
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