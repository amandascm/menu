import { Request, response, Response } from "express";
import fetch from "node-fetch";
import { Fachada } from "../controladores/fachada";

export class TelaLoginControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    authenticate(req: Request, res: Response, next: any) {
        const accesstoken = req.cookies['accesstoken'] ?? '';
        fetch('http://localhost:5000/verificartoken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({accesstoken})
        }).then(response => {
            response.json().then((result) => {
                const contaId = result.contaId;
                if(contaId) {
                    res.locals.contaId = contaId;
                    next();
                }
                else {
                    return res.status(401).render('unauthorized');
                }
            });
        }).catch((e) => {
            return res.status(401).render('unauthorized');
        });
    }

    loginExterno(req: Request, res: Response) {
        const {jwtToken, clientId} = req.body;
        fetch('http://localhost:3000/loginexterno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({jwtToken, clientId})
        }).then(response => {
            response.json().then((result) => {
                const token = result.token;
                if(token) {
                    res.setHeader('Set-Cookie', [
                        `accesstoken=${token}; Path=/cliente; HttpOnly; Max-Age=${60000 * 15};`,
                    ])                    
                    return res.redirect(`../cliente`);
                }
                else {                    
                    return res.status(404).render("telaLogin", {mensagem: 'Falha no login OAuth.'});
                }
            });
        }).catch((e) => {
            return res.status(404).render("telaLogin", {mensagem: 'Falha no login OAuth.'});
        });
    }

    login(req: Request, res: Response) {
        const accountType = req.query.accounttype === 'cliente' ? 'cliente' : 'restaurante';
        fetch(`http://localhost:5000/login/?accounttype=${accountType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        }).then((response) => {    
            response.json().then((result) => {                
                const token = result.token;
                if(token) {
                    res.setHeader('Set-Cookie', [
                        `accesstoken=${token}; Path=/${accountType}; HttpOnly; Max-Age=${60000 * 15};`,
                    ])
                    return res.redirect(`../${accountType}`);
                }
                return res.render("telaLogin", {mensagem: "Falha no login."})
            });
        });        
    }
}