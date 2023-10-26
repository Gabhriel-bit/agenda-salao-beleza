
export class Servico {
    private Codigo: number;
    private Nome: string;

    static emptyConstructor(): Servico{
        const newInstance =
           new Servico( 0, '');
        return newInstance
    }

    constructor(codigo: number, nome: string){
        this.Codigo = codigo;
        this.Nome = nome;
    }

    get getCodigo(){ return this.Codigo; }
    get getNome(){ return this.Nome; }

    set setCodigo(codigo: number){ this.Codigo = codigo; }
    set setNome(nome: string){ this.Nome = nome; }

    clone(){
        return new Servico(
            this.Codigo,
            this.Nome
        )
    }
}