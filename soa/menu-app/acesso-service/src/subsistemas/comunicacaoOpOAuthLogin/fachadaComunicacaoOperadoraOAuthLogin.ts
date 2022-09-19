import { ComunicacaoOperadoraOAuthLogin } from "./comunicacaoOperadoraOAuthLogin";
import { ISubsistemaComunicacaoOperadoraOAuthLogin } from "./ISubsistemaComunicacaoOperadoraOAuthLogin";

export class FachadaComunicacaoOperadoraOAuthLogin implements ISubsistemaComunicacaoOperadoraOAuthLogin {
    private commsOpOAuthLogin: ComunicacaoOperadoraOAuthLogin;

    constructor() {
        this.commsOpOAuthLogin = new ComunicacaoOperadoraOAuthLogin();
    }

    public login(jwtToken: string, clientID: string): Promise<{token: string, email:  string, nome: string}> {
        return this.commsOpOAuthLogin.login(jwtToken, clientID);
    }
}