import { Conta } from "../entidades/conta";
import { Restaurante } from "../entidades/restaurante";

export interface IRepositorioRestaurantes {
    existeRestaurante(c: Conta): Conta;
    registrarRestaurante(r: Restaurante): Restaurante;    
}