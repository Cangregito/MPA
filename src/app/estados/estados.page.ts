import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class EstadosPage implements AfterViewInit {
  @ViewChildren('chartCanvas') chartCanvas!: QueryList<ElementRef>;
  charts: Chart[] = [];

  sensores = [
    'Temperatura (°C)',
    'Humedad (%)',
    'Nivel de Luz (Lux)',
    'Presión Atmosférica (hPa)',
    'Distancia (cm)',
    'Ruido (dB)',
    'Gas MQ2 (%)',
    'Vibración (G)',
    'Consumo de Energía (W)',
    'Nivel de Agua (%)'
  ];

  labels: string[] = this.generateTimeLabels();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdRef.detectChanges();
      this.chartCanvas.forEach((canvas, index) => {
        if (canvas.nativeElement) {
          this.createChart(canvas.nativeElement, index);
        }
      });

      setInterval(() => {
        this.updateCharts();
      }, 5000); // Actualiza cada 5 segundos
    }, 500);
  }

  createChart(canvas: any, index: number) {
    const ctx = canvas.getContext('2d');
    this.charts[index] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...this.labels],
        datasets: [{
          label: this.sensores[index],
          data: this.getRandomData(index),
          borderColor: 'rgb(3, 71, 139)', // 🔹 Azul oscuro
          backgroundColor: 'rgba(0, 51, 102, 0.2)', // 🔹 Azul oscuro semi-transparente
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: 'rgb(7, 85, 164)' }
          }
        },
        scales: {
          x: {
            ticks: { color: 'rgb(0, 3, 167)' },
            grid: { color: 'rgba(0, 0, 0, 0.1)' }
          },
          y: {
            ticks: { color: 'rgb(0, 51, 102)' },
            grid: { color: 'rgba(0, 0, 0, 0.1)' }
          }
        }
      }
    });
  }

  updateCharts() {
    const newTimeLabel = this.getCurrentTime();
    this.labels.push(newTimeLabel);
    if (this.labels.length > 7) {
      this.labels.shift();
    }

    this.charts.forEach((chart, index) => {
      chart.data.labels = [...this.labels];

      chart.data.datasets.forEach(dataset => {
        dataset.data.push(this.getRandomValue(index)); // Nuevo valor aleatorio según el sensor
        if (dataset.data.length > 7) {
          dataset.data.shift(); // Elimina el primero
        }
      });

      chart.update();
    });
  }

  getRandomData(index: number) {
    return Array.from({ length: 7 }, () => this.getRandomValue(index));
  }

  getRandomValue(index: number): number {
    const ranges = [
      [15, 40],   // Temperatura (°C)
      [30, 80],   // Humedad (%)
      [0, 1000],  // Nivel de Luz (Lux)
      [950, 1050],// Presión Atmosférica (hPa)
      [2, 400],   // Distancia (cm)
      [30, 90],   // Ruido (dB)
      [0, 100],   // Gas MQ2 (%)
      [0, 5],     // Vibración (G)
      [10, 500],  // Consumo de Energía (W)
      [0, 100]    // Nivel de Agua (%)
    ];

    const [min, max] = ranges[index % ranges.length];
    return Math.random() * (max - min) + min;
  }

  generateTimeLabels() {
    const labels = [];
    for (let i = -6; i <= 0; i++) {
      labels.push(this.getCurrentTime(i * 5));
    }
    return labels;
  }

  getCurrentTime(offsetMinutes = 0) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + offsetMinutes);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}
