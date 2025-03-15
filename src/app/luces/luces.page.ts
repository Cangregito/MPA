import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LucesPage implements OnInit {
  salones: string[] = [
    'I-001', 'I-002', 'I-003', 'I-004',
    'I-101', 'I-102', 'I-103', 'I-104',
    'H-001', 'H-002', 'H-003', 'H-004',
    'H-101', 'H-102', 'H-103', 'H-104'
  ];

  estadoLuces: boolean[] = [];

  constructor() {}

  ngOnInit() {
    this.estadoLuces = new Array(this.salones.length).fill(false);
  }

  toggleLuz(index: number) {
    console.log(`Luz en ${this.salones[index]}: ${this.estadoLuces[index] ? 'Encendida' : 'Apagada'}`);
  }
}
