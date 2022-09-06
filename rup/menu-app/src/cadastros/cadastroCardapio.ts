import { Cardapio } from "../entidades/cardapio";
import { Item } from "../entidades/item";
import { IRepositorioCardapios } from "./iRepositorioCardapios";

export class CadastroCardapio {
    private repositorio: IRepositorioCardapios;

    constructor(repositorio: IRepositorioCardapios) {
        this.repositorio = repositorio;
    }

    registrarCardapio(c: Cardapio): boolean {
        return this.repositorio.registrarCardapio(c);
    }

    getItemCardapio(restId: number, nomeItem: string) {
        return this.repositorio.getItemCardapio(restId, nomeItem);
    }

    getCardapio(restId: number): Cardapio {
        return this.repositorio.getCardapio(restId);
    }

    getCardapioDisponiveis(restId: number): Cardapio {
        return this.repositorio.getCardapioDisponiveis(restId);
    }

    deleteItemCardapio(restId: number, nomeItem: string): boolean {
        return this.repositorio.deleteItem(restId, nomeItem);
    }

    addItemCardapio(restId: number, item: Item): Item | undefined {
        return this.repositorio.addItem(restId, item);
    }

    public updateItemCardapio(restId: number, nomeItem: string, item: Item) {
        return this.repositorio.updateItem(restId, nomeItem, item);
    }
}