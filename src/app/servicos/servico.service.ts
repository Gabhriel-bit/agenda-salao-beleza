import { Servico } from "./servico.model";

export class ServicosService {

    private selectedServico: Servico = null;

    private servicos: Servico[] = [
        new Servico(1, 'Corte de Cabelo'),
        new Servico(2, 'Coloração de Cabelo'),
        new Servico(3, 'Manicure'),
        new Servico(4, 'Pedicure'),
        new Servico(5, 'Maquiagem'),
        new Servico(6, 'Depilação'),
        new Servico(7, 'Escova'),
        new Servico(8, 'Hidratação Capilar'),
        new Servico(9, 'Penteado')
    ];

    setSelectedServico(servicoData: Servico){
        let index = -1;

        if ((servicoData !== null) && (servicoData !== undefined)){
            index = this.servicos.findIndex(servico => servico.getCodigo === servicoData.getCodigo);
        }

        this.selectedServico =
            index === -1 ? null : this.servicos[index];
    }

    getSelectedServico(){
        return (this.selectedServico === null ||
                this.selectedServico === undefined) ? null : this.selectedServico.clone();
    }

    getServicos(){
        this.orderListByName();
        return this.servicos.slice();
    }

    deleteItemServico(servicoData: Servico){
        if (servicoData !== null) {
            this.servicos = this.servicos.filter(item => item.getCodigo !== servicoData.getCodigo);
            this.selectedServico = null;
            this.orderListByName();
        }
    }

    updateItemServico(servicoData: Servico){
        if (servicoData !== null) {
            const index = this.servicos.findIndex(
                servico => servico.getCodigo === servicoData.getCodigo
            );

            this.servicos[index].setNome = servicoData.getNome
            this.orderListByName();
        }
    }

    insertItemServico(servicoData: Servico){
        if (servicoData !== null) {
            const newServico = servicoData.clone();
            this.servicos.push(newServico);
            this.selectedServico = newServico;
            this.orderListByName();
        }
    }

    orderListByName(){
        if (this.servicos.length >= 2){
            this.servicos.sort(
                (itemAtual, proxItem) =>
                    itemAtual.getNome < proxItem.getNome ? -1 : 1
            )
        }
    }

    getNextCodigo(){
        if (this.servicos.length === 0) {
            return 1;
        }
        
        let maiorCodigo = 0;

        this.servicos.forEach((servico) => {
            if (servico.getCodigo > maiorCodigo) {
                maiorCodigo = servico.getCodigo;
            }
        });

        return maiorCodigo + 1;
    }
}