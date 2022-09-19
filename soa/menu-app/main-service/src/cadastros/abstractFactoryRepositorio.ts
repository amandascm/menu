import { IRepositorioCardapios } from "./iRepositorioCardapios";

export abstract class AbstractFactoryRepositorio {
    abstract createRepositorioCardapios() : IRepositorioCardapios;
}