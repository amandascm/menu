import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";
import fetch from 'node-fetch';

export class TelaCadastroControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    registrar(req: Request, res: Response) {
        const accountType = req.query.accounttype;
        fetch(`http:localhost:5000/cadastro/?accounttype=${accountType}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: req.body
        }).then((response) => {
            if (!response.ok) {
                return res.render("telaCadastro", {mensagem: 'Uma conta já existe com o email fornecido.'})
            }
    
            response.json().then((result) => {
                if(result.id < 0) return res.render("telaCadastro", {mensagem: 'Uma conta já existe com o email fornecido.'});
                return res.redirect('../login')
            });
        });
    }
}