import { CadastroCardapio } from "../cadastros/cadastroCardapio";
import { Item } from "../entidades/item";

export class ControladorCardapio {
    cadastroCardapio : CadastroCardapio;

    constructor(cadastroCardapio: CadastroCardapio) {
        this.cadastroCardapio = cadastroCardapio;
    }

    public getItensCardapio(restId: number) {
        const cardapio = this.cadastroCardapio.getCardapio(restId);
        if(cardapio.getRestId()) {
            const cardapioInfo = JSON.parse(JSON.stringify(cardapio))
            return cardapioInfo.itens
        } else {
            return []
        }
    }

    public deleteItemCardapio(restId: number, nomeItem: string) {
        return this.cadastroCardapio.deleteItemCardapio(restId, nomeItem);
    }

    public addItemCardapio(restId: number, item: Item) {
        return this.cadastroCardapio.addItemCardapio(restId, item);
    }
}