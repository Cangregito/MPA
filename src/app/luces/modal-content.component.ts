import { Component, Input, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-content',
  styleUrls: ['./modal-content.component.scss'],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hora Encendido</th>
            <th>Hora Apagado</th>
            <th>Consumo</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let record of data; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ record.horaEncendido }}</td>
            <td>{{ record.horaApagado }}</td>
            <td>{{ record.consumo }}</td>
          </tr>
        </tbody>
      </table>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ModalContent {
  @Input() title!: string;
  @Input() data: any[] = [];

  private modalCtrl = inject(ModalController);

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
