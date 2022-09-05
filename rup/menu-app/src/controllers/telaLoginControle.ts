import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";

export class TelaLoginControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    loginExterno(req: Request, res: Response) {
        if(this.fachada.controladorLogin.loginExterno()) {
            return res.render("welcome");
        }
        else {
            return res.render("telaLogin", {mensagem: 'Falha no login OAuth.'})
        }
    }

    login(req: Request, res: Response) {
        const {email, password} = req.body
        const accountType = req.query.accounttype === 'cliente' ? 'cliente' : 'restaurante'
        if(this.fachada.controladorLogin.login(email, password, accountType)) {
            return res.render("welcome");
        }
        return res.render("telaLogin", {mensagem: "Falha no login."})
    }
}