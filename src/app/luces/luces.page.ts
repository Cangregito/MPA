import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalContent } from './modal-content.component';
import { MenuLucesComponent } from './menu-luces.component';
import { TranslationService } from '../services/translation.service'; // Importar el servicio de traducción
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LucesPage implements OnInit {
  private modalCtrl = inject(ModalController);
  private popoverCtrl = inject(PopoverController);

  // Lista de claves de traducción para los salones
  salonesKeys: string[] = [
    'SALON_I_001', 'SALON_I_002', 'SALON_I_003', 'SALON_I_004',
    'SALON_I_101', 'SALON_I_102', 'SALON_I_103', 'SALON_I_104',
    'SALON_I_PASILLO_1', 'SALON_I_PASILLO_2', 'SALON_I_EXTERIOR',
    'SALON_H_001', 'SALON_H_002', 'SALON_H_003', 'SALON_H_004',
    'SALON_H_101', 'SALON_H_102', 'SALON_H_103', 'SALON_H_104',
    'SALON_H_PASILLO_1', 'SALON_H_PASILLO_2', 'SALON_H_EXTERIOR'
  ];

  estadoLuces: boolean[] = [];

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService // Inyectar el servicio de traducción
  ) {}

  ngOnInit() {
    this.estadoLuces = new Array(this.salonesKeys.length).fill(false);
    this.darkModeService.loadTheme();
  }

  // Método para obtener el nombre traducido de un salón
  getSalonName(key: string): string {
    return this.translationService.getTranslation(key);
  }

  toggleLuz(index: number) {
    const salon = this.getSalonName(this.salonesKeys[index]);
    console.log(`Luz en ${salon}: ${this.estadoLuces[index] ? 'Encendida' : 'Apagada'}`);
  }

  async openMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: MenuLucesComponent,
      event: event,
      translucent: true
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.handleMenuAction(data);
    }
  }

  handleMenuAction(data: any) {
    if (data.action === 'all') {
      this.toggleAllLights();
    } else if (data.action === 'zone') {
      this.toggleZone(data.zone);
    } else if (data.action === 'floor') {
      this.toggleFloor(data.building, data.floor);
    }
  }

  toggleAllLights() {
    const allOn = this.estadoLuces.every(luz => luz);
    this.estadoLuces.fill(!allOn);
  }

  toggleZone(zone: string) {
    this.salonesKeys.forEach((key, index) => {
      if (key.startsWith(zone) || key.includes(zone)) {
        this.estadoLuces[index] = !this.estadoLuces[index];
      }
    });
  }

  toggleFloor(building: string, floor: string) {
    const floorPrefix = floor === 'baja' ? '00' : '10'; // Identifica los números de piso
    this.salonesKeys.forEach((key, index) => {
      if (key.startsWith(`${building}-${floorPrefix}`)) {
        this.estadoLuces[index] = !this.estadoLuces[index];
      }
    });
  }

  async openModal(key: string) {
    const salon = this.getSalonName(key);
    const registros = this.generarRegistrosFicticios();

    const modal = await this.modalCtrl.create({
      component: ModalContent,
      componentProps: {
        title: `Historial de ${salon}`,
        data: registros
      }
    });

    await modal.present();
  }

  generarRegistrosFicticios() {
    return [
      { horaEncendido: '08:00 AM', horaApagado: '10:00 AM', consumo: '20W' },
      { horaEncendido: '11:00 AM', horaApagado: '01:00 PM', consumo: '20W' },
      { horaEncendido: '03:00 PM', horaApagado: '05:00 PM', consumo: '20W' },
      { horaEncendido: '06:00 PM', horaApagado: '08:00 PM', consumo: '20W' }
    ];
  }
}