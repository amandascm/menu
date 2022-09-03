import { Conta } from "../entidades/conta";
import { Cliente } from "../entidades/cliente";

export interface IRepositorioClientes {
    existeCliente(c: Conta): Conta;
    registrarCliente(c: Cliente): Cliente;
    getConta(email: string): Conta;
}