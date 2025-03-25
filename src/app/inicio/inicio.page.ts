import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DarkModeService } from '../services/dark-mode.service';
import { TranslationService } from '../services/translation.service'; // Importar el servicio de traducción
register();

@Component({
  selector: 'app-inicio',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Asegúrate de que esté aquí
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink]
})
export class InicioPage implements OnInit {
  swiperModules = [IonicSlides];

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService // Hacer el servicio público para usarlo en el HTML
  ) { }

  ngOnInit() {
    this.darkModeService.loadTheme();
  }
}