import { Cardapio } from "../entidades/cardapio";
import { Item } from "../entidades/item";

export interface IRepositorioCardapios {
    registrarCardapio(c: Cardapio): boolean;
    getItemCardapio(restId: number, item: string): Item | undefined;
    getCardapio(restId: number): Cardapio;
    getCardapioDisponiveis(restId: number): Cardapio;
    deleteItem(restId: number, nomeItem: string): boolean;
    updateItem(restId: number, nomeItem: string, updatedItem: Item): Item | undefined;
    addItem(restId: number, item: Item): Item | undefined;
}