import { Sessao } from "../entidades/sessao";
import { IRepositorioSessao } from "./iRepositorioSessao";
import bancoSessao from '../data/sessao/sessao.json'
import fs from 'fs'
import path from 'path'

export class RepositorioSessaoOO implements IRepositorioSessao {
    sessoes;

    constructor() {
        this.sessoes = bancoSessao['sessao'];
    }

    private atualizaBanco(): void {
        const data = JSON.stringify({"sessao": this.sessoes});
        fs.writeFile(path.join(__dirname, '..', 'data', 'sessao', 'sessao.json'), data, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    private getNewToken(): string {
        return (parseInt(this.sessoes[this.sessoes.length - 1].token) + 1).toString();
    }

    public registrarSessao(s: Sessao): Sessao {
        s = new Sessao(this.getNewToken(), s.getTipoConta(), s.getContaId());
        this.sessoes.push(JSON.parse(JSON.stringify(s)));
        this.atualizaBanco();
        return s;
    }

    public getSessao(token: string): Sessao {
        const existe = this.sessoes.find(i => i.token == token);
        if(existe) {
            return new Sessao(existe.token, existe.tipoConta, existe.contaId);
        }else {
            return new Sessao('', '', 0);
        }
    }

}