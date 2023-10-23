import { UpperCasePipe } from '@angular/common';
import * as moment from 'moment';

export class Agendamento {
    private Codigo: number;
    private DataHora: Date;
    private NomeCliente: string;
    private NomeFuncionario: string;
    private HasPreferenciaAtt: Boolean;
    private Servicos: string[];

    static emptyConstructor(): Agendamento{
        const newInstance =
           new Agendamento( 0, new Date(), '', '', false, [] );
        return newInstance
    }

    constructor(codigo: number,
                dataHora: Date,
                nomeCliente: string,
                nomeFuncionario: string,
                hasPreferenciaAtt: Boolean,
                servicos: string[]){
        this.Codigo = codigo;
        this.DataHora = dataHora;
        this.NomeCliente = nomeCliente;
        this.Servicos = servicos;
        this.NomeFuncionario = nomeFuncionario;
        this.HasPreferenciaAtt = hasPreferenciaAtt;
    }

    get getServicos(){ return this.Servicos.slice(); }
    get getDataHora(){ return this.DataHora; }
    get getCodigo(){ return this.Codigo; }
    get getNomeCliente(){ return this.NomeCliente; }
    get getNomeFuncionario(){ return this.NomeFuncionario; }
    get getHasPreferenciaAtt(){ return this.HasPreferenciaAtt; }
    get getStrHasPreferenciaAtt(){ return this.HasPreferenciaAtt ? 'Sim' : 'Não'; }

    set setServicos(servicos: string[]){ this.Servicos = servicos.slice(); }
    set setDataHora(data: Date){ this.DataHora = data; }
    set setCodigo(codigo: number){ this.Codigo = codigo; }
    set setNomeCliente(nomeCliente: string){ this.NomeCliente = nomeCliente; }
    set setNomeFuncionario(nomeFuncionario: string){ this.NomeFuncionario = nomeFuncionario; }
    set setHasPreferenciaAtt(hasPref: boolean){ this.HasPreferenciaAtt = hasPref; }
    set setStrHasPreferenciaAtt(hasPref: string){ this.HasPreferenciaAtt = hasPref.toUpperCase() === 'SIM'; }

    getFormatedDate(format: string = 'HH:mm DD/MM/YYYY'){
        return (moment(this.DataHora)).format(format);
    }

    updateValues(dataHora: Date,
                 nomeCliente: string,
                 nomeFuncionario: string,
                 hasPreferenciaAtt: Boolean,
                 servicos: string[]){
        this.DataHora = dataHora;
        this.NomeCliente = nomeCliente;
        this.Servicos = servicos;
        this.NomeFuncionario = nomeFuncionario;
        this.HasPreferenciaAtt = hasPreferenciaAtt;
    }

    clone(){
        return new Agendamento(
            this.Codigo,
            new Date(this.DataHora.getTime()),
            this.NomeCliente,
            this.NomeFuncionario,
            this.HasPreferenciaAtt,
            this.Servicos.slice(),
        )
    }
}