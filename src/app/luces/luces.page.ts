import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalContent } from './modal-content.component';
import { DarkModeService } from '../services/dark-mode.service';
import { MenuLucesComponent } from './menu-luces.component';

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

  salones: string[] = [
    'I-001', 'I-002', 'I-003', 'I-004',
    'I-101', 'I-102', 'I-103', 'I-104',
    'I-Pasillo 1', 'I-Pasillo 2', 'I-Exterior',
    'H-001', 'H-002', 'H-003', 'H-004',
    'H-101', 'H-102', 'H-103', 'H-104',
    'H-Pasillo 1', 'H-Pasillo 2', 'H-Exterior'
  ];

  estadoLuces: boolean[] = [];

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.estadoLuces = new Array(this.salones.length).fill(false);
    this.darkModeService.loadTheme();
  }

  toggleLuz(index: number) {
    console.log(`Luz en ${this.salones[index]}: ${this.estadoLuces[index] ? 'Encendida' : 'Apagada'}`);
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
    this.salones.forEach((salon, index) => {
      if (salon.startsWith(zone) || salon.includes(zone)) {
        this.estadoLuces[index] = !this.estadoLuces[index];
      }
    });
  }

  toggleFloor(building: string, floor: string) {
    const floorPrefix = floor === 'baja' ? '00' : '10'; // Identifica los números de piso
    this.salones.forEach((salon, index) => {
      if (salon.startsWith(`${building}-${floorPrefix}`)) {
        this.estadoLuces[index] = !this.estadoLuces[index];
      }
    });
  }

  async openModal(salon: string) {
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
