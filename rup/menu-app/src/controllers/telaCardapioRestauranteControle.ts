import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";
import { Item } from "../entidades/item";

export class TelaCardapioRestauranteControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    visualizarCardapio(req: Request, res: Response) {
        const contaId = res.locals.contaId
        const cardapioItens = this.fachada.visualizarCardapio(contaId)
        return res.render('telaCardapioRestaurante', {itens: cardapioItens})
    }

    removerItemCardapio(req: Request, res: Response) {
        const contaId = res.locals.contaId
        const { nomeItem } = req.body
        if(nomeItem) {
            if(this.fachada.deleteItemCardapio(contaId, nomeItem)) {
                const cardapioItens = this.fachada.visualizarCardapio(contaId)
                return res.render('telaCardapioRestaurante', {itens: cardapioItens})
            }
        }
    }

    adicionarItemCardapio(req: Request, res: Response) {
        const contaId = res.locals.contaId
        const { nomeItem, descricaoItem, precoItem, disponivelItem } = req.body
        const item = new Item(disponivelItem, nomeItem, descricaoItem, precoItem)
        if(this.fachada.addItemCardapio(contaId, item)) {
            res.redirect("../cardapio/")
        }
    }
}