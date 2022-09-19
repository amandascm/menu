import { CadastroRestaurante } from "../cadastros/cadastroRestaurante"
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { Cliente } from "../entidades/cliente";
import { Restaurante } from "../entidades/restaurante";

export class ControladorCadastro {
    cadastroRestaurante: CadastroRestaurante;
    cadastroCliente: CadastroCliente;

    constructor(cadastroR: CadastroRestaurante, cadastroC: CadastroCliente) {
        this.cadastroRestaurante = cadastroR;
        this.cadastroCliente = cadastroC;
    }

    registrarRestaurante(r: Restaurante) {
        if(!this.cadastroRestaurante.existeRestaurante(r)) {
            const rest = this.cadastroRestaurante.registrarRestaurante(r);
            return rest.getId();
        }
        return -1;
    }

    registrarCliente(c: Cliente) {
        if(!this.cadastroCliente.existeCliente(c)) {
            const client = this.cadastroCliente.registrarCliente(c);
            return client.getId();
        } 
        return -1;
    }
}