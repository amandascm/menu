import { CadastroSessao } from "../cadastros/cadastroSessao";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { CadastroRestaurante } from "../cadastros/cadastroRestaurante";
import { Sessao } from "../entidades/sessao";
import { Cliente } from "../entidades/cliente";
import { ISubsistemaComunicacaoOperadoraOAuthLogin } from "../subsistemas/comunicacaoOpOAuthLogin/ISubsistemaComunicacaoOperadoraOAuthLogin";
import { FachadaComunicacaoOperadoraOAuthLogin } from "../subsistemas/comunicacaoOpOAuthLogin/fachadaComunicacaoOperadoraOAuthLogin";
import { Endereco } from "../entidades/endereco";
import { Conta } from "../entidades/conta";

export class ControladorLogin {
    cadastroSessao: CadastroSessao;
    cadastroCliente: CadastroCliente;
    cadastroRestaurante: CadastroRestaurante;
    subsistemaComunicacaoOpOAuthLogin: ISubsistemaComunicacaoOperadoraOAuthLogin;

    constructor(cadastroS: CadastroSessao, cadastroC: CadastroCliente, cadastroR: CadastroRestaurante) {
        this.cadastroSessao = cadastroS;
        this.cadastroCliente = cadastroC;
        this.cadastroRestaurante = cadastroR;
        this.subsistemaComunicacaoOpOAuthLogin = new FachadaComunicacaoOperadoraOAuthLogin();
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

    public loginExterno(): string {
        const response = this.subsistemaComunicacaoOpOAuthLogin.login();
        if(response.token) {    // se o login externo foi validado
            const endereco = new Endereco('',0,'',0)
            const c = new Cliente(0, response.email, '', response.nome, endereco)
            if(!this.cadastroCliente.existeCliente(c)) {
                const registeredClient = this.cadastroCliente.registrarCliente(c);
                const sessao = new Sessao(response.token, 'cliente', registeredClient.getId());
                return this.cadastroSessao.registrarSessao(sessao).getToken();
            }
            else {
                const registeredConta = this.cadastroCliente.getClienteConta(response.email);
                const sessao = new Sessao(response.token, 'cliente', registeredConta.getId());
                return this.cadastroSessao.registrarSessao(sessao).getToken();
            }
        }
        return ''
    }
}