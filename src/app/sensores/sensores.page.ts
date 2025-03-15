import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SensoresPage implements OnInit {
  sensors = [
    { name: 'Sensor de Temperatura', icon: 'thermometer', status: this.getRandomStatus() },
    { name: 'Sensor de Humedad', icon: 'water', status: this.getRandomStatus() },
    { name: 'Sensor de Movimiento', icon: 'walk', status: this.getRandomStatus() },
    { name: 'Sensor de Gas', icon: 'flame', status: this.getRandomStatus() },
    { name: 'Sensor de Luz', icon: 'sunny', status: this.getRandomStatus() },
    { name: 'Sensor de Presión', icon: 'speedometer', status: this.getRandomStatus() },
  ];
  
  constructor() { }

  ngOnInit() { }

  getRandomStatus(): string {
    return Math.random() > 0.3 ? 'active' : 'disconnected';
  }
}
