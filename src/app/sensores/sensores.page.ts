import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service'; 
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SensoresPage implements OnInit {
  sensors = [
    { key: 'TEMPERATURA_I_001', icon: 'thermometer-outline', status: this.getRandomStatus() },
    { key: 'HUMEDAD_I_001', icon: 'water-outline', status: this.getRandomStatus() },
    { key: 'RUIDO_I_002', icon: 'volume-high-outline', status: this.getRandomStatus() },
    { key: 'INCENDIO_I_004', icon: 'bonfire-outline', status: this.getRandomStatus() },
    { key: 'METANO_GAS_I_101', icon: 'cloud-outline', status: this.getRandomStatus() },
    { key: 'MONOXIDO_CARBONO_I_102', icon: 'warning-outline', status: this.getRandomStatus() },
    { key: 'DIOXIDO_CARBONO_I_103', icon: 'leaf-outline', status: this.getRandomStatus() },
    { key: 'HUMO_I_104', icon: 'flame-outline', status: this.getRandomStatus() },
    { key: 'CALIDAD_AIRE', icon: 'partly-sunny-outline', status: this.getRandomStatus() },
    { key: 'TEMPERATURA_H_001', icon: 'thermometer-outline', status: this.getRandomStatus() },
    { key: 'TERREMOTO_H_002', icon: 'pulse-outline', status: this.getRandomStatus() },
    { key: 'HUMO_H_004', icon: 'flame-outline', status: this.getRandomStatus() },
    { key: 'RUIDO_H_101', icon: 'volume-high-outline', status: this.getRandomStatus() },
    { key: 'INCENDIO_H_102', icon: 'bonfire-outline', status: this.getRandomStatus() },
    { key: 'PRESION_H_104', icon: 'speedometer-outline', status: this.getRandomStatus() },
  ];

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService
  ) { }

  ngOnInit() { 
    this.darkModeService.loadTheme();
  }

  getRandomStatus(): string {
    return Math.random() > 0.3 ? 'active' : 'disconnected';
  }

  getSensorName(key: string): string {
    return this.translationService.getTranslation(key);
  }
}