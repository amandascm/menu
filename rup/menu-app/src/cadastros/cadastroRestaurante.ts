import { Conta } from "../entidades/conta";
import { Restaurante } from "../entidades/restaurante";
import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";

export class CadastroRestaurante {
    private repositorio: IRepositorioRestaurantes;

    constructor(repositorio: IRepositorioRestaurantes) {
        this.repositorio = repositorio;
    }

    existeRestaurante(c: Conta): boolean {
        return this.repositorio.existeRestaurante(c);
    }

    registrarRestaurante(r: Restaurante): Restaurante {
        return this.repositorio.registrarRestaurante(r);
    }
}