import { Sessao } from "../entidades/sessao";
import { IRepositorioSessao } from "./iRepositorioSessao";

export class CadastroSessao {
    private repositorio: IRepositorioSessao;

    constructor(repositorio: IRepositorioSessao) {
        this.repositorio = repositorio;
    }

    getSessao(token: string): Sessao {
        return this.repositorio.getSessao(token);
    }

    registrarSessao(s: Sessao): Sessao {
        return this.repositorio.registrarSessao(s);
    }
}