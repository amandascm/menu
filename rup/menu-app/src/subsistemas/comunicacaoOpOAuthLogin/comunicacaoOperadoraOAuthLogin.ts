import { OAuth2Client } from "google-auth-library";

export class ComunicacaoOperadoraOAuthLogin {
    private client: OAuth2Client;

    constructor() {        
        this.client = new OAuth2Client('829656890134-doed71f77q3rmvhhj0c2o6r0ntjj7d68.apps.googleusercontent.com');
    }

    public async login(jwtToken: string, clientID: string): Promise<{ token: string; email: string; nome: string; }> {
        let token = "", email = "", nome = "";
        return this.verify(jwtToken, clientID).then(ticket => {
            const payLoad = ticket.getPayload() as any;
            if(payLoad) {
                token = payLoad.jti || "";
                email = payLoad.email || "";
                nome = payLoad.name || "";
            }
            return { token, email, nome }
        });
    }
    
    public async verify(token: string, clientID: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: clientID
        });
        return ticket;      
    }

}