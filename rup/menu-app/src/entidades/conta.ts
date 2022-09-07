export class Conta {
  protected id: number;
  protected email: string;
  protected senha: string;
  
  constructor(id: number, email: string, senha: string) {
    this.id = id;
    this.email = email;
    this.senha = senha;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId() : number {
    return this.id;
  }

  public getEmail() : string {
    return this.email;
  }

  public getSenha() : string {
    return this.senha;
  }
}