import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-luces',
  standalone: true, // Permite que este componente se use de forma independiente
  imports: [IonicModule, CommonModule], // Agrega IonicModule aquí
  styleUrls: ['./menu-luces.component.scss'],
  template: `
    <ion-list>
      <ion-item button (click)="toggleAllLights()">Encender/Apagar Todas</ion-item>
      <ion-item button (click)="toggleZone('I')">Encender/Apagar Edificio I</ion-item>
      <ion-item button (click)="toggleZone('H')">Encender/Apagar Edificio H</ion-item>
      <ion-item button (click)="toggleFloor('I', 'baja')">Encender/Apagar Planta Baja Edificio I</ion-item>
      <ion-item button (click)="toggleFloor('I', 'alta')">Encender/Apagar Planta Alta Edificio I</ion-item>
      <ion-item button (click)="toggleFloor('H', 'baja')">Encender/Apagar Planta Baja Edificio H</ion-item>
      <ion-item button (click)="toggleFloor('H', 'alta')">Encender/Apagar Planta Alta Edificio H</ion-item>
      <ion-item button (click)="toggleZone('Exterior')">Encender/Apagar Exteriores</ion-item>
    </ion-list>
  `
})
export class MenuLucesComponent {
  constructor(private popoverCtrl: PopoverController) {}

  toggleAllLights() {
    this.popoverCtrl.dismiss({ action: 'all' });
  }

  toggleZone(zone: string) {
    this.popoverCtrl.dismiss({ action: 'zone', zone });
  }

  toggleFloor(building: string, floor: string) {
    this.popoverCtrl.dismiss({ action: 'floor', building, floor });
  }
}
