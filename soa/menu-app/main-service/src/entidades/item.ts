export class Item {
    public disponivel: boolean
    public nome: string
    public descricao: string
    public preco: number

    constructor(disponivel: boolean, nome: string, descricao: string, preco: number) {
        this.disponivel = disponivel
        this.nome = nome
        this.descricao = descricao
        this.preco = preco
    }
}