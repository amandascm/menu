import { Conta } from "../entidades/conta";
import { Cliente } from "../entidades/cliente";
import { IRepositorioClientes } from "./iRepositorioClientes";

export class CadastroCliente {
    private repositorio: IRepositorioClientes;

    constructor(repositorio: IRepositorioClientes) {
        this.repositorio = repositorio;
    }

    existeCliente(c: Conta): boolean {
        return this.repositorio.existeCliente(c);
    }

    registrarCliente(c: Cliente): Cliente {
        return this.repositorio.registrarCliente(c);
    }

    getClienteConta(email: string): Conta {
        return this.repositorio.getConta(email);
    }
}