import { TipoProdotto } from './tipoProdotto';

export class Prodotto {
    nome: string;
    tipo: TipoProdotto;
    scadenza: Date;
    sistemato: boolean

    constructor(nome:string, tipo:TipoProdotto, scadenza:Date){
        this.nome=nome;
        this.tipo=tipo;
        this.scadenza=scadenza;
        this.sistemato=false;
    }
}