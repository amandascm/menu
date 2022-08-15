import { CadastroRestaurante } from "../cadastros/cadastroRestaurante"
import { Restaurante } from "../entidades/restaurante";

export class ControladorCadastro {
    cadastroRestaurante: CadastroRestaurante;

    constructor(cadastro: CadastroRestaurante) {
        this.cadastroRestaurante = cadastro;
    }

    registrarRestaurante(r: Restaurante) {
        if(!this.cadastroRestaurante.existeRestaurante(r)) {
            this.cadastroRestaurante.registrarRestaurante(r);
            return true;
        } 
        return false;
    }
}