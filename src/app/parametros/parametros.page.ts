import { Component, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalContent } from './modal-content.component';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.page.html',
  styleUrls: ['./parametros.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ParametrosPage {
  private modalCtrl = inject(ModalController);

  modalTitle: string = '';
  modalData: any[] = [];
  modalValue: string = '';

  sensoresList = [
    { nombre: 'Temperatura (I-001)', icono: 'thermometer-outline', valor: '25°C' },
    { nombre: 'Humedad (I-001)', icono: 'water-outline', valor: '60%' },
    { nombre: 'Ruido (I-002)', icono: 'volume-high-outline', valor: '25°C' },
    { nombre: 'Incendio (I-004)', icono: 'bonfire-outline', valor: '60%' },
    { nombre: 'Metano/Gas (I-101)', icono: 'cloud-outline', valor: '180 ppm' },
    { nombre: 'Monóxido de Carbono (I-102)', icono: 'warning-outline', valor: '35 ppm' },
    { nombre: 'Dióxido de Carbono (I-103)', icono: 'leaf-outline', valor: '300 ppm' },
    { nombre: 'Humo (I-104)', icono: 'flame-outline', valor: '200 ppm' },
    { nombre: 'Calidad_Aire', icono: 'partly-sunny-outline', valor: 'Buena (50)' },
    { nombre: 'Temperatura (H-001)', icono: 'thermometer-outline', valor: '25°C' },
    { nombre: 'Terremoto (H-002)', icono: 'pulse-outline', valor: '25°C' },
    { nombre: 'Humo (H-004)', icono: 'flame-outline', valor: '25°C' },
    { nombre: 'Ruido (H-101)', icono: 'volume-high-outline', valor: '1013 hPa' },
    { nombre: 'Incendio (H-102)', icono: 'bonfire-outline', valor: '1013 hPa' },
    { nombre: 'Presión (H-104)', icono: 'speedometer-outline', valor: '1013 hPa' },
  ];

sensores: Record<string, { fecha: string; hora: string; valor: string }[]> = {
  Temperatura: [
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '24°C' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '25°C' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '26°C' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '27°C' },
  ]
};

constructor(private darkModeService: DarkModeService) { }


ngOnInit() {
  this.darkModeService.loadTheme(); 
}
  async openModal(sensor: string) {
    this.modalTitle = sensor;
    this.modalData = this.sensores[sensor] || [];
    this.modalValue = this.modalData.length ? this.modalData[this.modalData.length - 1].valor : 'N/A';

    const modal = await this.modalCtrl.create({
      component: ModalContent,
      componentProps: {
        title: this.modalTitle,
        data: this.modalData,
        value: this.modalValue
      }
    });

    await modal.present();
  }
}
