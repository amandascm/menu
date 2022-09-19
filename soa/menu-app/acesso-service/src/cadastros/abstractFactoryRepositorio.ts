import { IRepositorioClientes } from "./iRepositorioClientes";
import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";
import { IRepositorioSessao } from "./iRepositorioSessao";

export abstract class AbstractFactoryRepositorio {
    abstract createRepositorioRestaurantes() : IRepositorioRestaurantes;
    abstract createRepositorioClientes() : IRepositorioClientes;
    abstract createRepositorioSessao() : IRepositorioSessao;
}