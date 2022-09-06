import { Cardapio } from "../entidades/cardapio";
import { Item } from "../entidades/item";
import { IRepositorioCardapios } from "./iRepositorioCardapios";
import bancoCardapios from "../data/cardapios/cardapios.json";
import fs from 'fs'
import path from 'path'


export class RepositorioCardapiosOO implements IRepositorioCardapios {
    private cardapios;

    constructor() {
        this.cardapios = bancoCardapios['cardapios'];
    }

    deleteItem(restId: number, nomeItem: string): boolean {
        const cardapio = this.getCardapio(restId)
        if(cardapio.getRestId()) {
            const successfulDelete = cardapio.deleteItem(nomeItem)
            if(successfulDelete) {
                let cardapioJson = this.cardapios.find((c) => c.restId === cardapio.getRestId());
                if(cardapioJson && cardapioJson.itens){
                    cardapioJson.itens = JSON.parse(JSON.stringify(cardapio.getItens()))
                    this.atualizaBanco()
                    return true
                }
            }
        }
        return false
    }

    updateItem(restId: number, nomeItem: string, updatedItem: Item): Item {
        throw new Error("Method not implemented.");
    }
    addItem(restId: number, item: Item): Item | undefined {
        const cardapio = this.getCardapio(restId)
        if(cardapio.getRestId()) {
            if(!cardapio.existeItem(item)) {
                const cardapioIndex = this.getCardapioIndex(restId)
                this.cardapios[cardapioIndex].itens.push(JSON.parse(JSON.stringify(item)))
                return item
            }
        }
        return undefined
    }

    private atualizaBanco(): void {
        const data = JSON.stringify({"cardapios": this.cardapios});
        fs.writeFile(path.join(__dirname, '..', 'data', 'cardapios', 'cardapios.json'), data, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    private existeCardapio(restId: number): boolean {
        return this.cardapios.find((c) => c.restId == restId) !== undefined;
    }

    public registrarCardapio(c: Cardapio): boolean {
        if(this.existeCardapio(c.getRestId())){
            return false;
        } else {
            this.cardapios.push(JSON.parse(JSON.stringify(c)));
            this.atualizaBanco();
            return true;
        }        
    }

    public getCardapio(restId: number): Cardapio {
        const cardInfo = this.cardapios.find((c) => c.restId == restId)
        if (cardInfo) {
            return new Cardapio(cardInfo.itens, cardInfo.restId);
        }
        return new Cardapio([], 0);
    }

    public getCardapioIndex(restId: number): number {
        return this.cardapios.findIndex((c) => c.restId == restId)
    }

    public getCardapioDisponiveis(restId: number): Cardapio {
        const cardInfo = this.cardapios.find((c) => c.restId == restId)
        if (cardInfo) {
            return new Cardapio(cardInfo.itens.filter((i) => i.disponivel === true), cardInfo.restId);
        }
        return new Cardapio([], 0);
    }
}