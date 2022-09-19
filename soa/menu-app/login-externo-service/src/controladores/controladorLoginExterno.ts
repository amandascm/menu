import { ISubsistemaComunicacaoOperadoraOAuthLogin } from "../subsistemas/comunicacaoOpOAuthLogin/ISubsistemaComunicacaoOperadoraOAuthLogin";
import { FachadaComunicacaoOperadoraOAuthLogin } from "../subsistemas/comunicacaoOpOAuthLogin/fachadaComunicacaoOperadoraOAuthLogin";
import fetch from "node-fetch"

export class ControladorLoginExterno {
    subsistemaComunicacaoOpOAuthLogin: ISubsistemaComunicacaoOperadoraOAuthLogin;

    constructor() {
        this.subsistemaComunicacaoOpOAuthLogin = new FachadaComunicacaoOperadoraOAuthLogin();
    }

    public async loginExterno(jwtToken: string, clientID: string): Promise<string> {
        const loginResponse = await this.subsistemaComunicacaoOpOAuthLogin.login(jwtToken, clientID);
        if(loginResponse.token) {    // se o login externo foi validado
            const responseContaId = await fetch('http://acesso-service:5000/getcliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({name: loginResponse.nome, email: loginResponse.email})
            });
            const contaJson = await responseContaId.json();
            const contaId = contaJson.contaId;
            const responseToken = await fetch('http://acesso-service:5000/registrarsessao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({token: loginResponse.token, tipoConta: 'cliente', contaId: contaId})
            });
            const tokenJson = await responseToken.json();
            return tokenJson.token;
        }
        else 
            return ''
    }
}