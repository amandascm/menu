import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";

export class TelaCardapioRestauranteControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    visualizarCardapio(req: Request, res: Response) {
        res.render('telaCardapioRestaurante', {itens: [
            {nome: "lasanha", descricao: "com molho de tomate", preco: 23.70, disponivel: true},
            {nome: "risoto", descricao: "com molho branco", preco: 26.70, disponivel: false},
        ]})
    }
}