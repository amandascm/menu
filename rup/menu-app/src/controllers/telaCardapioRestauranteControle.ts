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

    getAtualizarItemTemplate(req: Request, res: Response) {
        const contaId = res.locals.contaId
        const { nomeItem } = req.body
        if(nomeItem) {
            const item = this.fachada.getItemCardapio(contaId, nomeItem);
            if(item) {
                return res.render('partials/updateItem', { item: item });
            }
        }
        res.sendStatus(404);
    }

    atualizarItemCardapio(req: Request, res: Response) {
        const contaId = res.locals.contaId
        const { nomeItem, novoNomeItem, descricaoItem, precoItem, disponivelItem } = req.body
        const item = new Item(disponivelItem, novoNomeItem, descricaoItem, precoItem)
        if(this.fachada.updateItemCardapio(contaId, nomeItem, item)) {
            return res.redirect("../cardapio/")
        }
        res.sendStatus(404);
    }
}