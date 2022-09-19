export interface ISubsistemaComunicacaoOperadoraOAuthLogin {
    login(jwtToken: string, clientID: string): Promise<{token: string, email:  string, nome: string}>;
}