import { Sessao } from "../entidades/sessao";

export interface IRepositorioSessao {
    getSessao(token: string): Sessao;
    registrarSessao(s: Sessao): Sessao;    
}