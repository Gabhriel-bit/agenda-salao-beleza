import { Agendamento } from "./agendamento.model";

export class AgendamentosService {

    private selectedAgendamento: Agendamento = null;

    private agendamentos: Agendamento[] = [
        new Agendamento(1, new Date(1682374200000), 'Gabhriel', 'Juliana', true, ['Corte de cabelo', 'Barba']),
        new Agendamento(2, new Date(1697585400000), 'Carlos', 'Carmem', false, ['Platinar']),
        new Agendamento(3, new Date(1688275200000), 'Rodrigo', 'Juliana', false, ['Barba']),
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