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
      <p class="modal-value">Valor actual: {{ value }}</p>
      <table *ngIf="data.length > 0; else noData">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let record of data; let i = index">
            <td>{{ i + 1 }}</td>
            <td>{{ record.fecha }}</td>
            <td>{{ record.hora }}</td>
            <td>{{ record.valor }}</td>
          </tr>
        </tbody>
      </table>
      <ng-template #noData>
        <p>No hay datos disponibles.</p>
      </ng-template>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ModalContent {
  @Input() title!: string;
  @Input() data: any[] = [];
  @Input() value!: string;

  private modalCtrl = inject(ModalController);

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
