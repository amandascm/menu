import { Conta } from "./conta";
import { Endereco } from "./endereco";

export class Restaurante extends Conta {
    private nome: string;
    private endereco: Endereco;
    private telefone: string;

    constructor(id: number, email: string, senha: string, nome: string, endereco: Endereco, telefone: string) {
        super(id, email, senha);
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    public getNome() : string {
        return this.nome;
    }
    
    public getEndereco() : Endereco {
        return this.endereco;
    }

    public getTelefone() : string {
        return this.telefone;
    }
}