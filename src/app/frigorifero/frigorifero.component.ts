import { Component, OnInit, ViewChild } from '@angular/core';
import { Prodotto } from 'src/models/prodotto';
import { TipoProdotto } from 'src/models/tipoProdotto';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent, BehaviorSubject, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-frigorifero',
  templateUrl: './frigorifero.component.html',
  styleUrls: ['./frigorifero.component.css']
})
export class FrigoriferoComponent implements OnInit {

  listaProdotti: Prodotto[] = [];
  listaVerdure: Prodotto[] = [];
  listaSalumi: Prodotto[] = [];
  listaFormaggi: Prodotto[] = [];
  listaBibite: Prodotto[] = [];
  listaAltro: Prodotto[] = [];

  prodottoSelezionato: Prodotto;
  ripianoSelezionato: string;

  myControl = new FormControl();
  //listaProdottiFiltrata: Observable<Prodotto[]>;

  ordina: boolean = false;
  search: string;
  listaProdottiFiltrati: Prodotto[];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    /*     
    // Versione con Observable che non andava con filtro e ordina assieme

    this.listaProdottiFiltrata = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
 */
    this.generaProdotti();
  }

  // Quando cambia l'input di ricerca
  onKey(value:string){
    this.search = value;
    this.listaProdottiFiltrati = this._filter(this.search);
  }

  // Filtra la lista dei prodotti in base al testo nella ricerca
  private _filter(value: string): Prodotto[] {
    const filterValue = value.toLowerCase();
    return this.listaProdotti.filter(prodotto => prodotto.nome.toLowerCase().includes(filterValue));
  }

  // Ordina i prodotti per data di scadenza
  ordinaProdotti(){
    //this.listaProdottiFiltrata = of(this.listaProdotti.sort(!this.ordina?this.sortByDateDesc:this.sortByDateAsc));
    this.listaProdottiFiltrati = this.listaProdottiFiltrati.sort(!this.ordina?this.sortByDateDesc:this.sortByDateAsc);
    this.ordina=!this.ordina;
  }

  sortByDateDesc(a:Prodotto,b:Prodotto){
    return b.scadenza.getTime() - a.scadenza.getTime();
  }

  sortByDateAsc(a:Prodotto,b:Prodotto){
    return a.scadenza.getTime() - b.scadenza.getTime();
  }

  // Inizializzazione lista prodotti
  generaProdotti (){
    this.listaProdotti = [    
        new Prodotto("Mortadella", TipoProdotto.salumi, new Date("2020-04-08")),
        new Prodotto("Prosciutto crudo", TipoProdotto.salumi, new Date("2020-05-08")),
        new Prodotto("Birra", TipoProdotto.bibite, new Date("2020-06-08")),
        new Prodotto("Gorgonzola", TipoProdotto.formaggi, new Date("2020-04-05")),
        new Prodotto("Pecorino", TipoProdotto.formaggi, new Date("2020-04-04")),
        new Prodotto("Insalata fresca", TipoProdotto.verdure, new Date("2020-04-08")),
        new Prodotto("Sedano", TipoProdotto.verdure, new Date("2020-04-06")),
        new Prodotto("Peperoni", TipoProdotto.verdure, new Date("2020-04-09")),
        new Prodotto("Coca cola", TipoProdotto.bibite, new Date("2021-04-01")),
        new Prodotto("Vitello tonnato", TipoProdotto.altro, new Date("2020-04-15")),
    ];

    this.listaProdottiFiltrati = this.listaProdotti;
  }

  // Evento emesso dal component foglia Prodotto quando viene cliccato il bottone
  sistema(prodotto){
    this.prodottoSelezionato = prodotto;
    this.openDialog();
  }

  // Dialog per selezionare il ripiano dove sistemare il prodotto
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {prodotto: this.prodottoSelezionato}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ripianoSelezionato = result;
      this.controllaRipiano();
    });
  }

  // Controlla se il prodotto è stato inserito nel ripiano corretto
  controllaRipiano (){
    if(this.ripianoSelezionato === this.prodottoSelezionato.tipo ){
      this.aggiungiProdotto();
      let confirmMessage = `"${this.prodottoSelezionato.nome}" aggiunto correttamente nel ripiano ${this.ripianoSelezionato}!`;
      this.openSnackBar(confirmMessage, "OK");
      this.controllaTutti();
    }

    else if(this.ripianoSelezionato==undefined){
      let errorMessage = `Errore! Non hai selezionato nessun ripiano`;
      this.openSnackBar(errorMessage, "OK");      
    }

    else{
      let errorMessage = `Errore! "${this.prodottoSelezionato.nome}" non dovrebbe stare nel ripiano ${this.ripianoSelezionato}!`;
      this.openSnackBar(errorMessage, "OK");
    }
  }

  // Aggiunge un prodotto al ripiano corrispondente
  aggiungiProdotto (){
    this.prodottoSelezionato.sistemato=true;
    switch(this.prodottoSelezionato.tipo){
      case TipoProdotto.verdure:
        this.listaVerdure.push(this.prodottoSelezionato);
        break;      
      case TipoProdotto.salumi:
        this.listaSalumi.push(this.prodottoSelezionato);
        break;
      case TipoProdotto.formaggi:
        this.listaFormaggi.push(this.prodottoSelezionato);
        break;      
      case TipoProdotto.bibite:
        this.listaBibite.push(this.prodottoSelezionato);
        break;      
      case TipoProdotto.altro:
        this.listaAltro.push(this.prodottoSelezionato);
        break;     
    }
  }

  // Controlla se tutti i prodotti sono stati sistemati
  controllaTutti(){
    if(this.listaAltro.length + 
      this.listaBibite.length + 
      this.listaFormaggi.length + 
      this.listaSalumi.length +
      this.listaVerdure.length === this.listaProdotti.length){
        this.openSnackBar("Tutti i prodotti sono stati correttamente aggiunti ai ripiani!", "OK");
      }
  }

  // Snackbar per messaggi di errore o conferma
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000,
    });

  }
}