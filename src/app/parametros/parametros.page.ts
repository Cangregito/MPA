import { Component, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalContent } from './modal-content.component';

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
    { nombre: 'Temperatura', icono: 'thermometer-outline', valor: '25°C' },
    { nombre: 'Humedad', icono: 'water-outline', valor: '60%' },
    { nombre: 'Presión', icono: 'speedometer-outline', valor: '1013 hPa' },
    { nombre: 'MQ2', icono: 'flame-outline', valor: '200 ppm' },
    { nombre: 'MQ4', icono: 'cloud-outline', valor: '180 ppm' },
    { nombre: 'MQ7', icono: 'warning-outline', valor: '35 ppm' },
    { nombre: 'MQ135', icono: 'leaf-outline', valor: '300 ppm' },
    { nombre: 'Calidad_Aire', icono: 'partly-sunny-outline', valor: 'Buena (50)' },
  ];

// Simulación de datos de sensores
sensores: Record<string, { fecha: string; hora: string; valor: string }[]> = {
  Temperatura: [
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '24°C' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '25°C' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '26°C' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '27°C' },
  ],
  Humedad: [
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '58%' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '60%' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '62%' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '65%' },
  ],
  Presión: [
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '1012 hPa' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '1013 hPa' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '1015 hPa' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '1014 hPa' },
  ],
  MQ2: [ // Sensor de gas inflamable y humo
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '200 ppm' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '250 ppm' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '220 ppm' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '210 ppm' },
  ],
  MQ4: [ // Sensor de gas metano
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '180 ppm' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '190 ppm' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '170 ppm' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '160 ppm' },
  ],
  MQ7: [ // Sensor de monóxido de carbono
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '35 ppm' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '40 ppm' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '38 ppm' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '36 ppm' },
  ],
  MQ135: [ // Sensor de calidad del aire
    { fecha: '2025-03-10', hora: '10:00 AM', valor: '300 ppm' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: '320 ppm' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: '310 ppm' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: '305 ppm' },
  ],
  Calidad_Aire: [ // Índice de calidad del aire
    { fecha: '2025-03-10', hora: '10:00 AM', valor: 'Buena (50)' },
    { fecha: '2025-03-10', hora: '12:00 PM', valor: 'Moderada (75)' },
    { fecha: '2025-03-10', hora: '02:00 PM', valor: 'Aceptable (90)' },
    { fecha: '2025-03-10', hora: '04:00 PM', valor: 'Buena (60)' },
  ],
};


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
