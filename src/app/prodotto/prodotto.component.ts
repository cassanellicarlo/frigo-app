import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prodotto } from 'src/models/prodotto';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent implements OnInit {

  @Input() prodotto: Prodotto;
  @Output() sistemaNelFrigo = new EventEmitter<Prodotto>();

  constructor() { }

  ngOnInit(): void {
  }

  sistema(prodotto: Prodotto){
    this.sistemaNelFrigo.emit(prodotto);
  }

}
