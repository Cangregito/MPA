import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-elevador',
  templateUrl: './elevador.page.html',
  styleUrls: ['./elevador.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ElevadorPage {

  selectedLanguage: string = 'es';

  // Estado del ascensor 1
  floor1: boolean = true;  
  floor2: boolean = false; 
  moving: boolean = false; 
  doorOpen: boolean = false;

  // Estado del ascensor 2
  floor1_2: boolean = false; 
  floor2_2: boolean = true;  
  moving_2: boolean = false;
  doorOpen_2: boolean = true; 

  constructor(
    private darkModeService: DarkModeService, 
    public translationService: TranslationService
  ) { }


  ngOnInit() {
    this.darkModeService.loadTheme();
    this.selectedLanguage = this.translationService.getCurrentLanguage();
  }


  // Método para simular el cambio de estado del ascensor
  moveElevator(elevator: number, state: string) {
    if (elevator === 1) {
      this.floor1 = state === "floor1";
      this.floor2 = state === "floor2";
      this.moving = state === "moving";
    } else if (elevator === 2) {
      this.floor1_2 = state === "floor1";
      this.floor2_2 = state === "floor2";
      this.moving_2 = state === "moving";
    }
  }

  toggleDoor(elevator: number) {
    if (elevator === 1) {
      this.doorOpen = !this.doorOpen;
    } else if (elevator === 2) {
      this.doorOpen_2 = !this.doorOpen_2;
    }
  }
}


