export interface ISubsistemaComunicacaoOperadoraOAuthLogin {
    login(): {token: string, email:  string, nome: string};
}