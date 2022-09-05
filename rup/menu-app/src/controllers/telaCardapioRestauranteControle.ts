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
        res.render('telaCardapioRestaurante', {itens: cardapioItens})
    }
}