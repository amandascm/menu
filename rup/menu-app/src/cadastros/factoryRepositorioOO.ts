import { AbstractFactoryRepositorio } from "./abstractFactoryRepositorio";
import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";
import { RepositorioRestaurantesOO } from "./repositorioRestaurantesOO";

export class FactoryRepositorioOO extends AbstractFactoryRepositorio {
    createRepositorioRestaurantes(): IRepositorioRestaurantes {
        return new RepositorioRestaurantesOO();
    }
}