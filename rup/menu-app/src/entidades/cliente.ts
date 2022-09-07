import { Conta } from "./conta";
import { Endereco } from "./endereco";

export class Cliente extends Conta {
    private nome: string;
    private endereco: Endereco;

    constructor(id: number, email: string, senha: string, nome: string, endereco: Endereco) {
        super(id, email, senha);
        this.nome = nome;
        this.endereco = endereco;
    }

    public getNome() : string {
        return this.nome;
    }
    
    public getEndereco() : Endereco {
        return this.endereco;
    }
}