import { Cardapio } from "../entidades/cardapio";

export interface IRepositorioCardapios {
    registrarCardapio(c: Cardapio): boolean;
    getCardapio(restId: number): Cardapio;
    getCardapioDisponiveis(restId: number): Cardapio;
}