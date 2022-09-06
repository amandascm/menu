import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";

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
                return res.redirect('/')
            }
        }
    }
}