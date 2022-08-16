import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";
import { Cliente } from "../entidades/cliente";
import { Endereco } from "../entidades/endereco";
import { Restaurante } from "../entidades/restaurante";

export class TelaLoginControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    loginExterno(req: Request, res: Response) {
        if(this.fachada.controladorLogin.loginExterno()) {
            return res.render("welcome");
        }else {
            return res.render("telaLogin", {mensagem: 'Falha no login.'})
        }
    }
}