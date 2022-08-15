import { Request, Response } from "express";
import { Fachada } from "../controladores/fachada";
import { Cliente } from "../entidades/cliente";
import { Endereco } from "../entidades/endereco";
import { Restaurante } from "../entidades/restaurante";

export class TelaCadastroControle {
    private fachada: Fachada;

    constructor(fachada: Fachada) {
        this.fachada = fachada;
    }

    registrar(req: Request, res: Response) {
        const accountType = req.query.accounttype;
        if(accountType === "restaurante") {
            const {name, email, password, rua, bairro, cep, numero, telefone} = req.body;
            const endereco = new Endereco(rua, cep, bairro, numero);
            if(this.fachada.registrarRestaurante(new Restaurante(-1, email, password, name, endereco, telefone))) {
                return res.redirect("../login")
            }
        }
        else if(accountType === "cliente") {
            const {name, email, password, rua, bairro, cep, numero} = req.body;
            const endereco = new Endereco(rua, cep, bairro, numero);
            if(this.fachada.registrarCliente(new Cliente(-1, email, password, name, endereco))) {
                return res.redirect("../login")
            }
        }
        return res.render("register", {mensagem: 'Uma conta já existe com o email fornecido.'})
    }
}