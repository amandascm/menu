import { CadastroSessao } from "../cadastros/cadastroSessao";
import { CadastroCliente } from "../cadastros/cadastroCliente";
import { Sessao } from "../entidades/sessao";
import { Cliente } from "../entidades/cliente";
import { ISubsistemaComunicacaoOperadoraOAuthLogin } from "../subsistemas/comunicacaoOpOAuthLogin/ISubsistemaComunicacaoOperadoraOAuthLogin";
import { FachadaComunicacaoOperadoraOAuthLogin } from "../subsistemas/comunicacaoOpOAuthLogin/fachadaComunicacaoOperadoraOAuthLogin";
import { Endereco } from "../entidades/endereco";

export class ControladorLogin {
    cadastroSessao: CadastroSessao;
    cadastroCliente: CadastroCliente;
    subsistemaComunicacaoOpOAuthLogin: ISubsistemaComunicacaoOperadoraOAuthLogin;

    constructor(cadastroS: CadastroSessao, cadastroC: CadastroCliente) {
        this.cadastroSessao = cadastroS;
        this.cadastroCliente = cadastroC;
        this.subsistemaComunicacaoOpOAuthLogin = new FachadaComunicacaoOperadoraOAuthLogin();
    }

    public loginExterno(): number {
        const response = this.subsistemaComunicacaoOpOAuthLogin.login();
        if(response.token) {    // se o login externo foi validado
            const endereco = new Endereco('',-1,'',-1)
            const c = new Cliente(-1, response.email, '', response.nome, endereco)
            if(!this.cadastroCliente.existeCliente(c)) {
                const registeredClient = this.cadastroCliente.registrarCliente(c);
                const sessao = new Sessao(response.token, 'cliente', registeredClient.getId());
                this.cadastroSessao.registrarSessao(sessao);
                return registeredClient.getId();
            }
            else {
                const registeredConta = this.cadastroCliente.getClienteConta(response.email);
                const sessao = new Sessao(response.token, 'cliente', registeredConta.getId());
                this.cadastroSessao.registrarSessao(sessao);
                return registeredConta.getId();
            }
        }
        return -1
    }
}