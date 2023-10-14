import * as moment from 'moment';

export class Agendamento {
    private Codigo: number;
    private DataHora: Date;
    private NomeCliente: string;
    private NomeFuncionario: string;
    private HasPreferenciaAtt: Boolean;
    private Servicos: string[];
    
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

    getServicos(){
        return this.Servicos;
    }

    getDataHora(){
        return this.DataHora;
    }

    getFormatedDate(format: string = 'HH:mm DD/MM/YYYY'){
        return (moment(this.DataHora)).format(format);
    }

    getCodigo(){
        return this.Codigo;
    }

    getNomeCliente(){
        return this.NomeCliente;
    }

    getNomeFuncionario(){
        return this.NomeFuncionario;
    }

    getHasPreferenciaAtt(){
        return this.HasPreferenciaAtt;
    }

    getStrHasPreferenciaAtt(){
        return this.HasPreferenciaAtt ? 'Sim' : 'Não';
    }
}