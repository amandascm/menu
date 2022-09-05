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

    private atualizaBanco(): void {
        const data = JSON.stringify({"cardapios": this.cardapios});
        fs.writeFile(path.join(__dirname, '..', 'data', 'caredapios', 'cardapios.json'), data, (err) => {
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

    public getCardapioDisponiveis(restId: number): Cardapio {
        const cardInfo = this.cardapios.find((c) => c.restId == restId)
        if (cardInfo) {
            return new Cardapio(cardInfo.itens.filter((i) => i.disponivel === true), cardInfo.restId);
        }
        return new Cardapio([], 0);
    }
}