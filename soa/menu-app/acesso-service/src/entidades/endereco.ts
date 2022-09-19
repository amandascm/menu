export class Endereco {
    private rua: string;
    private cep: number;
    private bairro: string;
    private numero: number;

    constructor(rua: string, cep: number, bairro: string, numero: number) {
        this.rua = rua;
        this.cep = cep;
        this.bairro = bairro;
        this.numero = numero;
    }

    public getRua() : string {
        return this.rua;
    }
    
    public getCep() : number {
        return this.cep;
    }

    public getBairro() : string {
        return this.bairro;
    }

    public getNumero() : number {
        return this.numero;
    }
}