import { ISubsistemaComunicacaoOperadoraOAuthLogin } from "./ISubsistemaComunicacaoOperadoraOAuthLogin";

export class FachadaComunicacaoOperadoraOAuthLogin implements ISubsistemaComunicacaoOperadoraOAuthLogin {

    private getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    public login(): {token: string, email:  string, nome: string} {
        // simulacao do comportamento do subsistema
        const mockedLogins = [{token:'123a', email:'usuario1@user.com', nome:'usuario1'}, {token:'', email:'', nome:''}]
        return mockedLogins[this.getRandomInt(0, mockedLogins.length)];
    }
}