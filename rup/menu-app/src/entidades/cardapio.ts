import { Item } from "./item";

export class Cardapio {
    private itens: Item[]
    private restId: number

    constructor(itens: Item[], restId: number) {
        this.itens = itens
        this.restId = restId
    }

    public getItens(): Item[] {
        return this.itens
    }

    public getRestId(): number {
        return this.restId
    }

    private existeItem(i: Item): boolean {
        return this.itens.find((e) => e.nome === i.nome) !== undefined
    }

    private recuperaItemIndex(nome: string): number {
        return this.itens.findIndex((e) => e.nome === nome)
    }

    public newItem(i: Item): boolean {
        if(!this.existeItem(i)) {
            this.itens.push(i)
            return true
        }
        else {
            return false
        }
    }

    public updateItem(nome: string, i: Item): boolean {
        const toUpdateIndex = this.recuperaItemIndex(nome)
        if (toUpdateIndex >= 0) {
            this.itens[toUpdateIndex] = i
            return true
        }
        else {
            return false
        }
    }
}