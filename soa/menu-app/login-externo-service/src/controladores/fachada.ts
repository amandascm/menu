import { ControladorLoginExterno } from "./controladorLoginExterno";
import { Request, Response } from "express";

export class FachadaLoginExternoService {
    controladorLogin: ControladorLoginExterno;

    constructor() {
        this.controladorLogin = new ControladorLoginExterno();
    }

    loginExterno(req: Request, res: Response) {
        const {jwtToken, clientId} = req.body;
        this.controladorLogin.loginExterno(jwtToken, clientId).then(token => {
            if(token) {
                return res.send({ token: token });
            }
            else {
                return res.status(404).send({ message: "Falha no login externo" });
            }
        }).catch((e) => {
            return res.status(404).send({ message: "Falha no login externo" });
        })
    }
}