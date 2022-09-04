import { Conta } from "../entidades/conta";
import { Cliente } from "../entidades/cliente";
import { IRepositorioClientes } from "./iRepositorioClientes";
import bancoClientes from "../data/clientes/clientes.json";
import fs from 'fs'
import path from 'path'
import { Endereco } from "../entidades/endereco";


export class RepositorioClientesOO implements IRepositorioClientes {
    clientes;

    constructor() {
        this.clientes = bancoClientes['clientes'];
    }
    
    public existeCliente(c: Conta): Conta {
        const cliente = this.clientes.find(i => i.email == c.getEmail())
        return cliente
                ? new Conta(cliente.id, cliente.email, cliente.senha)
                : new Conta(0, '', '');
    }

    public verificaCliente(c: Conta): Conta {
        const cliente = this.clientes.find(i => i.email == c.getEmail() && i.senha == c.getSenha())
        return cliente
                ? new Conta(cliente.id, cliente.email, cliente.senha)
                : new Conta(0, '', '');
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

    public getConta(email: string): Conta {
        const existe = this.clientes.find(i => i.email == email);
        if(existe) {
            return new Conta(existe.id, existe.email, existe.senha);
        }else {
            return new Conta(0, '', '');
        }
    }

}