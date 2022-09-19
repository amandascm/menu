import { Conta } from "../entidades/conta";
import { Restaurante } from "../entidades/restaurante";
import { IRepositorioRestaurantes } from "./iRepositorioRestaurantes";
import bancoRestaurantes from "../data/restaurantes/restaurantes.json";
import fs from 'fs'
import path from 'path'


export class RepositorioRestaurantesOO implements IRepositorioRestaurantes {
    restaurantes;

    constructor() {
        this.restaurantes = bancoRestaurantes['restaurantes'];
    }

    
    public existeRestaurante(c: Conta): boolean {
        const restaurante = this.restaurantes.find(r => r.email == c.getEmail());
        return restaurante !== undefined;
    }

    public verificaRestaurante(c: Conta): Conta {
        const restaurante = this.restaurantes.find(r => r.email == c.getEmail() && r.senha == c.getSenha());
        return restaurante
                ? new Conta(restaurante.id, restaurante.email, restaurante.senha)
                : new Conta(0, '', '');
    }


    private getNewId(): number {
        return this.restaurantes[this.restaurantes.length - 1].id + 1;
    }

    private atualizaBanco(): void {
        const data = JSON.stringify({"restaurantes": this.restaurantes});
        fs.writeFile(path.join(__dirname, '..', 'data', 'restaurantes', 'restaurantes.json'), data, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    public registrarRestaurante(r: Restaurante): Restaurante {
        const id = this.getNewId();
        r.setId(id);
        this.restaurantes.push(JSON.parse(JSON.stringify(r)));
        this.atualizaBanco();
        return r;
    }

}