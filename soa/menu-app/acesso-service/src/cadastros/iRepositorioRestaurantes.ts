import { Conta } from "../entidades/conta";
import { Restaurante } from "../entidades/restaurante";

export interface IRepositorioRestaurantes {
    existeRestaurante(c: Conta): boolean;
    registrarRestaurante(r: Restaurante): Restaurante;
    verificaRestaurante(c: Conta): Conta;
}