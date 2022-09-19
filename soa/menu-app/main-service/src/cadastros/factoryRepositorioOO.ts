import { AbstractFactoryRepositorio } from "./abstractFactoryRepositorio";
import { IRepositorioCardapios } from "./iRepositorioCardapios";
import { RepositorioCardapiosOO } from "./repositorioCardapiosOO";

export class FactoryRepositorioOO extends AbstractFactoryRepositorio {
    createRepositorioCardapios(): IRepositorioCardapios {
        return new RepositorioCardapiosOO();
    }
}