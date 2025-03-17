import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalContent } from './modal-content.component';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LucesPage implements OnInit {
  private modalCtrl = inject(ModalController);

  salones: string[] = [
    'I-001', 'I-002', 'I-003', 'I-004',
    'I-101', 'I-102', 'I-103', 'I-104',
    'I-Pasillo 1', 'I-Pasillo 2', 'I-Exterior',
    'H-001', 'H-002', 'H-003', 'H-004',
    'H-101', 'H-102', 'H-103', 'H-104',
    'H-Pasillo 1', 'H-Pasillo 2', 'H-Exterior'
  ];

  estadoLuces: boolean[] = [];

  constructor() {}

  ngOnInit() {
    this.estadoLuces = new Array(this.salones.length).fill(false);
  }

  toggleLuz(index: number) {
    console.log(`Luz en ${this.salones[index]}: ${this.estadoLuces[index] ? 'Encendida' : 'Apagada'}`);
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
