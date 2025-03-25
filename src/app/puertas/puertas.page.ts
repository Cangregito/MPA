import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service'; 
import { DarkModeService } from '../services/dark-mode.service';

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

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService 
  ) {}

  ngOnInit() {
    this.darkModeService.loadTheme();
  }

  togglePuerta(numero: number) {
    if (numero === 1) {
      this.puerta1 = !this.puerta1;
    } else if (numero === 2) {
      this.puerta2 = !this.puerta2;
    }
  }
}
