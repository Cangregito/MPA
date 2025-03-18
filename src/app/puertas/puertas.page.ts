import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puertas',
  templateUrl: './puertas.page.html',
  styleUrls: ['./puertas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PuertasPage implements OnInit {
  puerta1: boolean = true; // true = cerrada, false = abierta
  puerta2: boolean = true; // true = cerrada, false = abierta

  constructor() {}

  ngOnInit() {}

  togglePuerta(numero: number) {
    if (numero === 1) {
      this.puerta1 = !this.puerta1;
    } else if (numero === 2) {
      this.puerta2 = !this.puerta2;
    }
  }
}
