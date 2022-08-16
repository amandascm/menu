import { AbstractFactoryRepositorio } from "./abstractFactoryRepositorio";
import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";
import { RepositorioRestaurantesOO } from "./repositorioRestaurantesOO";
import { RepositorioClientesOO } from "./repositorioClientesOO";
import { IRepositorioClientes } from "./iRepositorioClientes";
import { IRepositorioSessao } from "./iRepositorioSessao";
import { RepositorioSessaoOO } from "./repositorioSessaoOO";

export class FactoryRepositorioOO extends AbstractFactoryRepositorio {
    createRepositorioRestaurantes(): IRepositorioRestaurantes {
        return new RepositorioRestaurantesOO();
    }

    createRepositorioClientes(): IRepositorioClientes {
        return new RepositorioClientesOO();
    }

    createRepositorioSessao(): IRepositorioSessao {
        return new RepositorioSessaoOO();
    }
}