import { Conta } from "../entidades/conta";
import { Cliente } from "../entidades/cliente";
import { IRepositorioClientes } from "./iRepositorioClientes";
import bancoClientes from "../data/clientes/clientes.json";
import fs from 'fs'
import path from 'path'


export class RepositorioClientesOO implements IRepositorioClientes {
    clientes;

    constructor() {
        this.clientes = bancoClientes['clientes'];
    }
    
    public existeCliente(c: Conta): boolean {
        return this.clientes.find(i => i.email == c.getEmail()) !== undefined;
    }

    private getNewId(): number {
        return this.clientes[this.clientes.length - 1].id + 1;
    }

    private atualizaBanco(): void {
        const data = JSON.stringify({"clientes": this.clientes});
        fs.writeFile(path.join(__dirname, '..', 'data', 'clientes', 'clientes.json'), data, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    public registrarCliente(c: Cliente): Cliente {
        const id = this.getNewId();
        c.setId(id);
        this.clientes.push(JSON.parse(JSON.stringify(c)));
        this.atualizaBanco();
        return c;
    }

}