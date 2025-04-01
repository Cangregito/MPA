import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalContent } from './modal-content.component';
import { DarkModeService } from '../services/dark-mode.service';
import { TranslationService } from '../services/translation.service';
import { SensorDataService } from '../services/sensor-data.service';

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
    { key: 'TEMPERATURA_I_001', icono: 'thermometer-outline', edificio: 'I' , parametro: 'temperatura', valor: 'N/A' },
    { key: 'HUMEDAD_I_001', icono: 'water-outline', edificio: 'I', parametro: 'humedad', valor: 'N/A' },
    { key: 'RUIDO_I_002', icono: 'volume-high-outline', edificio: 'I', parametro: 'sonido', valor: 'N/A' },
    { key: 'INCENDIO_I_004', icono: 'bonfire-outline', edificio: 'I', parametro: 'fuego', valor: 'N/A' },
    { key: 'METANO_GAS_I_101', icono: 'cloud-outline', edificio: 'I', parametro: 'gas_metano', valor: 'N/A' },
    { key: 'MONOXIDO_CARBONO_I_102', icono: 'warning-outline', edificio: 'I' , parametro: 'gas_co', valor: 'N/A' },
    { key: 'DIOXIDO_CARBONO_I_103', icono: 'leaf-outline', edificio: 'I' , parametro: 'temperatura', valor: 'N/A' },
    { key: 'HUMO_I_104', icono: 'flame-outline', edificio: 'I', parametro: 'humo', valor: 'N/A' },
    { key: 'CALIDAD_AIRE', icono: 'partly-sunny-outline', edificio: 'I', parametro: 'calidad_aire', valor: 'N/A' },
    { key: 'TEMPERATURA_H_001', icono: 'thermometer-outline', edificio: 'H', parametro: 'temperatura', valor: 'N/A' },
    { key: 'HUMEDAD_H_001', icono: 'water-outline', edificio: 'H', parametro: 'humedad', valor: 'N/A' },
    { key: 'TERREMOTO_H_002', icono: 'pulse-outline', edificio: 'H', parametro: 'vibracion', valor: 'N/A' },
    { key: 'HUMO_H_004', icono: 'flame-outline', edificio: 'H', parametro: 'humo', valor: 'N/A' },
    { key: 'RUIDO_H_101', icono: 'volume-high-outline', edificio: 'H', parametro: 'sonido', valor: 'N/A' },
    { key: 'INCENDIO_H_102', icono: 'bonfire-outline', edificio: 'H', parametro: 'fuego', valor: 'N/A' },
    { key: 'PRESION_H_104', icono: 'speedometer-outline', edificio: 'H', parametro: 'presion', valor: 'N/A' },
    { key: 'LUZ_H_101', icono: 'sunny-outline', edificio: 'H', parametro: 'luz', valor: 'N/A' },
  ];

  private interval: any;

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService,
    private sensorDataService: SensorDataService
  ) { }

  ngOnInit() {
    this.darkModeService.loadTheme(); 
    this.fetchLatestData();
    this.interval = setInterval(() => this.fetchLatestData(), 5000);

  }

  getSensorName(key: string): string {
    return this.translationService.getTranslation(key);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  fetchLatestData() {
    this.sensorDataService.getLatestData().subscribe(
      (data) => {
        console.log("📡 Datos recibidos del servidor:", data); 
        
        this.sensoresList.forEach(sensor => {
          const key = sensor.key;
  
          switch (key) {
            // Edificio I
            case 'TEMPERATURA_I_001':
              sensor.valor = (data.temperatura_i !== null && data.temperatura_i !== undefined) ? `${data.temperatura_i}°C` : 'N/A';
              break;
            case 'HUMEDAD_I_001':
              sensor.valor = (data.humedad_i !== null && data.humedad_i !== undefined) ? `${data.humedad_i}%` : 'N/A';
              break;
            case 'RUIDO_I_002':
              sensor.valor = (data.sonido_i !== null && data.sonido_i !== undefined) ? `${data.sonido_i} dB` : 'N/A';
              break;
            case 'INCENDIO_I_004':
              sensor.valor = data.fuego_i ? '🔥 Detectado' : '✅ Seguro';
              break;
            case 'METANO_GAS_I_101':
              sensor.valor = (data.metano_i !== null && data.metano_i !== undefined) ? `${data.metano_i} ppm` : 'N/A';
              break;
            case 'MONOXIDO_CARBONO_I_102':
              sensor.valor = (data.monoxido_carbono_i !== null && data.monoxido_carbono_i !== undefined) ? `${data.monoxido_carbono_i} ppm` : 'N/A';
              break;
            case 'DIOXIDO_CARBONO_I_103':
              sensor.valor = (data.dioxido_carbono_i !== null && data.dioxido_carbono_i !== undefined) ? `${data.dioxido_carbono_i} ppm` : 'N/A';
              break;
            case 'HUMO_I_104':
              sensor.valor = (data.humo_i !== null && data.humo_i !== undefined) ? `${data.humo_i} ppm` : 'N/A';
              break;
            case 'CALIDAD_AIRE':
              sensor.valor = (data.calidad_aire !== null && data.calidad_aire !== undefined) ? `Índice ${data.calidad_aire}` : 'N/A';
              break;
  
            // Edificio H
            case 'TEMPERATURA_H_001':
              sensor.valor = (data.temperatura_h !== null && data.temperatura_h !== undefined) ? `${data.temperatura_h}°C` : 'N/A';
              break;
            case 'HUMEDAD_H_001':
              sensor.valor = (data.humedad_h !== null && data.humedad_h !== undefined) ? `${data.humedad_h}%` : 'N/A';
              break;
            case 'RUIDO_H_101':
              sensor.valor = (data.sonido_h !== null && data.sonido_h !== undefined) ? `${data.sonido_h} dB` : 'N/A';
              break;
            case 'INCENDIO_H_102':
              sensor.valor = data.fuego_h ? '🔥 Detectado' : '✅ Seguro';
              break;
            case 'LUZ_H_103':
              sensor.valor = (data.luz_h !== null && data.luz_h !== undefined) ? `🔓 ${data.luz} accesos` : '🔒 Sin acceso';
              break;
            case 'TERREMOTO_H_002':
              sensor.valor = data.vibracion_h ? '🔥 Detectado' : '✅ Seguro';
              break;
            case 'PRESION_H_104':
              sensor.valor = (data.presion_h !== null && data.presion_h !== undefined) ? `${data.presion_h} hPa` : 'N/A';
              break;
            case 'HUMO_H_004':
              sensor.valor = (data.humo_h !== null && data.humo_h !== undefined) ? `${data.humo_h} ppm` : 'N/A';
              break;
            case 'LUZ_H_101':
              sensor.valor = (data.luz_h !== null && data.luz_h !== undefined) ? `${data.luz_h}` : 'N/A';
              break;
          }
        });
      },
      (error) => console.error('Error obteniendo datos:', error)
    );
  }
  

  async openModal(sensorKey: string, edificio: string) {
    const sensorName = this.getSensorName(sensorKey);
    this.modalTitle = `${sensorName} - ${edificio}`; 
    this.modalData = []; 
  
    try {
      const data = await this.sensorDataService.getSensorHistory(sensorKey, edificio).toPromise();
      this.modalData = data;
    } catch (error) {
      console.error(`Error al obtener historial de ${sensorKey} para el edificio ${edificio}:`, error);
      this.modalData = [];
    }
  
    const modal = await this.modalCtrl.create({
      component: ModalContent,
      componentProps: {
        title: this.modalTitle,
        data: this.modalData,
        value: this.modalData.length ? this.modalData[0].valor : 'N/A'
      }
    });
  
    await modal.present();
  }
  
}