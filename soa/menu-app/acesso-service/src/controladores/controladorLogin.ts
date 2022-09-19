import { CadastroSessao } from "../cadastros/cadastroSessao";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { Sessao } from "../entidades/sessao";
import { Conta } from "../entidades/conta";
import { Endereco } from "../entidades/endereco";
import { Cliente } from "../entidades/cliente";

export class ControladorLogin {
    cadastroSessao: CadastroSessao;
    cadastroCliente: CadastroCliente;
    cadastroRestaurante: CadastroRestaurante;

    constructor(cadastroS: CadastroSessao, cadastroC: CadastroCliente, cadastroR: CadastroRestaurante) {
        this.cadastroSessao = cadastroS;
        this.cadastroCliente = cadastroC;
        this.cadastroRestaurante = cadastroR;
    }

    public authenticate(token: string): number {
        const sessao = this.cadastroSessao.getSessao(token);
        return sessao.getContaId();
    }

    public login(email: string, senha: string, tipoConta: string): string {
        const conta = new Conta(0, email, senha);
        const recoveredConta = tipoConta === 'cliente'
                                ? this.cadastroCliente.verificaCliente(conta)
                                : this.cadastroRestaurante.verificaRestaurante(conta);
        if (recoveredConta.getId()) {
            const sessao = new Sessao('', tipoConta, recoveredConta.getId());
            return this.cadastroSessao.registrarSessao(sessao).getToken();
        } else {
            return '';
        }
    }

    public getCliente(email: string, name: string): number {
        const endereco = new Endereco('',0,'',0);
        const c = new Cliente(0, email, '', name, endereco)
        if(!this.cadastroCliente.existeCliente(c)) {
            const registeredClient = this.cadastroCliente.registrarCliente(c);
            return registeredClient.getId();
        }
        return this.cadastroCliente.getClienteConta(email).getId();
    }

    public registrarSessao(s: Sessao) {
        return this.cadastroSessao.registrarSessao(s);
    }
}