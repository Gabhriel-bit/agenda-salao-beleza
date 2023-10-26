import { Agendamento } from "./agendamento.model";
import { Servico } from '../servicos/servico.model';

export class AgendamentosService {

    private selectedAgendamento: Agendamento = null;

    private agendamentos: Agendamento[] = [
        new Agendamento(1, new Date(1682374200000), 'Gabhriel', 'Juliana', true,
            [ new Servico(1, 'Corte de Cabelo'),
              new Servico(2, 'Coloração de Cabelo'),
              new Servico(3, 'Manicure'),
              new Servico(4, 'Pedicure'),
              new Servico(5, 'Maquiagem'),
              new Servico(6, 'Depilação')]),
        new Agendamento(2, new Date(1697585400000), 'Carlos', 'Carmem', false,
            [ new Servico(3, 'Manicure'),
              new Servico(4, 'Pedicure'),
              new Servico(5, 'Maquiagem')]),
        new Agendamento(3, new Date(1688275200000), 'Rodrigo', 'Juliana', false,
            [ new Servico(7, 'Escova'),
              new Servico(8, 'Hidratação Capilar'),
              new Servico(9, 'Penteado')]),
    ];

    setSelectedAgendamento(agendamentoData: Agendamento){
        let index = -1;

        if ((agendamentoData !== null) && (agendamentoData !== undefined)){
            index = this.agendamentos.findIndex(agenda => agenda.getCodigo === agendamentoData.getCodigo);
        }

        this.selectedAgendamento =
            index === -1 ? null : this.agendamentos[index];
    }

    getSelectedAgendamento(){
        return (this.selectedAgendamento === null ||
                this.selectedAgendamento === undefined) ? null : this.selectedAgendamento.clone();
    }

    getAgendamentos(){
        this.orderListByData();
        return this.agendamentos.slice();
    }

    deleteItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            this.agendamentos = this.agendamentos.filter(item => item.getCodigo !== agendamentoData.getCodigo);
            this.selectedAgendamento = null;
            this.orderListByData();
        }
    }

    updateItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            const index = this.agendamentos.findIndex(
                agenda => agenda.getCodigo === agendamentoData.getCodigo
            );

            this.agendamentos[index].updateValues(
                agendamentoData.getDataHora,
                agendamentoData.getNomeCliente,
                agendamentoData.getNomeFuncionario,
                agendamentoData.getHasPreferenciaAtt,
                agendamentoData.getServicos
            );
            this.orderListByData();
        }
    }

    insertItemAgenda(agendamentoData: Agendamento){
        if (agendamentoData !== null) {
            const newAgendamento = agendamentoData.clone();
            this.agendamentos.push(newAgendamento);
            this.selectedAgendamento = newAgendamento;
            this.orderListByData();
        }
    }

    orderListByData(){
        if (this.agendamentos.length >= 2){
            this.agendamentos.sort(
                (itemAtual, proxItem) => itemAtual.getDataHora.getTime() - proxItem.getDataHora.getTime()
            )
        }
    }

    getNextCodigo(){
        if (this.agendamentos.length === 0) {
            return 1;
        }
        
        let maiorCodigo = 0;

        this.agendamentos.forEach((agendamento) => {
            if (agendamento.getCodigo > maiorCodigo) {
                maiorCodigo = agendamento.getCodigo;
            }
        });

        return maiorCodigo + 1;
    }
}