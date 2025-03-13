import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-inicio',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class InicioPage implements OnInit {
  swiperModules = [IonicSlides];

  constructor() { }

  ngOnInit() {
  }

}
