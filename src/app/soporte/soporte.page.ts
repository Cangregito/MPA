import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service'; 
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class SoportePage implements OnInit {
  mensaje: string = '';

  problemasFrecuentes = [
    { 
      titulo: 'PROBLEMA_1_TITULO', 
      solucion: 'PROBLEMA_1_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_2_TITULO', 
      solucion: 'PROBLEMA_2_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_3_TITULO', 
      solucion: 'PROBLEMA_3_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_4_TITULO', 
      solucion: 'PROBLEMA_4_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_5_TITULO', 
      solucion: 'PROBLEMA_5_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_6_TITULO', 
      solucion: 'PROBLEMA_6_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_7_TITULO', 
      solucion: 'PROBLEMA_7_SOLUCION' 
    },
    { 
      titulo: 'PROBLEMA_8_TITULO', 
      solucion: 'PROBLEMA_8_SOLUCION' 
    },

  ];

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService
  ) { }

  ngOnInit() {
    this.darkModeService.loadTheme(); 
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
