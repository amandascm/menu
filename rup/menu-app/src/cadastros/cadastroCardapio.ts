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

    getCardapio(restId: number): Cardapio {
        return this.repositorio.getCardapio(restId);
    }

    getCardapioDisponiveis(restId: number): Cardapio {
        return this.repositorio.getCardapioDisponiveis(restId);
    }
}