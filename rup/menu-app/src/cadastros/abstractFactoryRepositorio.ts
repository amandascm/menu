import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";

export abstract class AbstractFactoryRepositorio {
    abstract createRepositorioRestaurantes() : IRepositorioRestaurantes;
}