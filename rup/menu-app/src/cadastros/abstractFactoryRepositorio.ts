import { IRepositorioClientes } from "./iRepositorioClientes";
import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";

export abstract class AbstractFactoryRepositorio {
    abstract createRepositorioRestaurantes() : IRepositorioRestaurantes;
    abstract createRepositorioClientes() : IRepositorioClientes;
}