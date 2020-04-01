import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prodotto } from 'src/models/prodotto';

@Component({
  selector: 'app-lista-prodotti',
  templateUrl: './lista-prodotti.component.html',
  styleUrls: ['./lista-prodotti.component.css']
})
export class ListaProdottiComponent implements OnInit {

  @Input() listaProdotti: Prodotto[];
  @Output() sistemaNelFrigo = new EventEmitter<Prodotto>();

  constructor() { }

  ngOnInit(): void {
  }

  sistema(prodotto: Prodotto){
    this.sistemaNelFrigo.emit(prodotto);
  }

}
