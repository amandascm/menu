export class Sessao {
    private token: string;
    private tipoConta: string;
    private contaId: number;

    constructor(token: string, tipoConta: string, contaId: number) {
        this.token = token;
        this.tipoConta = tipoConta;
        this.contaId = contaId;
    }

    public getToken(): string {
        return this.token;
    }

    public getTipoConta(): string {
        return this.tipoConta;
    }

    public getContaId(): number {
        return this.contaId;
    }

    public setToken(token: string): void {
        this.token = token;
    }
}