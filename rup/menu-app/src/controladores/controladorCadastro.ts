import { CadastroRestaurante } from "../cadastros/cadastroRestaurante"
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { CadastroCardapio } from "../cadastros/cadastroCardapio";
import { Cliente } from "../entidades/cliente";
import { Restaurante } from "../entidades/restaurante";
import { Cardapio } from "../entidades/cardapio";

export class ControladorCadastro {
    cadastroRestaurante: CadastroRestaurante;
    cadastroCliente: CadastroCliente;
    cadastroCardapio: CadastroCardapio;

    constructor(cadastroR: CadastroRestaurante, cadastroC: CadastroCliente, cadastroCard: CadastroCardapio) {
        this.cadastroRestaurante = cadastroR;
        this.cadastroCliente = cadastroC;
        this.cadastroCardapio = cadastroCard;
    }

    registrarRestaurante(r: Restaurante) {
        if(!this.cadastroRestaurante.existeRestaurante(r)) {
            const rest = this.cadastroRestaurante.registrarRestaurante(r);
            this.cadastroCardapio.registrarCardapio(new Cardapio([], rest.getId()));
            return true;
        }
        return false;
    }

    registrarCliente(c: Cliente) {
        if(!this.cadastroCliente.existeCliente(c)) {
            this.cadastroCliente.registrarCliente(c);
            return true;
        } 
        return false;
    }
}