import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";

export class TelaLoginControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    authenticate(req: Request, res: Response, next: any) {
        const accesstoken = req.cookies['accesstoken'] ?? '';
        const contaId = this.fachada.controladorLogin.authenticate(accesstoken);
        if(contaId) {
            next();
        }
        else {
            res.status(401).render('unauthorized');
        }
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
        const token = this.fachada.controladorLogin.login(email, password, accountType)
        if(token) {
            res.setHeader('Set-Cookie', [
                `accesstoken=${token}; Path=/${accountType}; HttpOnly; Max-Age=${60000 * 15};`,
            ])
            return res.render("welcome");
        }
        return res.render("telaLogin", {mensagem: "Falha no login."})
    }
}