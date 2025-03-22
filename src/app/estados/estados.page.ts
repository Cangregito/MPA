import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class EstadosPage implements AfterViewInit, OnDestroy {
  @ViewChildren('chartCanvas') chartCanvas!: QueryList<ElementRef>;
  charts: Chart[] = [];
  labels: string[] = this.generateTimeLabels();
  private themeSubscription!: Subscription;

  sensores = [
    'Temperatura (°C)', 'Humedad (%)', 'Nivel de Luz (Lux)', 'Presión Atmosférica (hPa)',
    'Distancia (cm)', 'Ruido (dB)', 'Gas MQ2 (%)', 'Vibración (G)', 'Consumo de Energía (W)', 'Nivel de Agua (%)'
  ];

  constructor(private cdRef: ChangeDetectorRef, private darkModeService: DarkModeService) {}

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
      }, 5000);
    }, 500);

    this.themeSubscription = this.darkModeService.darkMode$.subscribe(() => {
      this.updateChartColors();
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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
          borderColor: this.getChartColor(), // Cambia según el modo
          backgroundColor: this.getChartFill(), // Cambia según el modo
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: this.getChartLabelColor() }
          }
        },
        scales: {
          x: {
            ticks: { color: this.getChartLabelColor() },
            grid: { color: this.getChartGridColor() }
          },
          y: {
            ticks: { color: this.getChartLabelColor() },
            grid: { color: this.getChartGridColor() }
          }
        }
      }
    });
  }

  updateChartColors() {
    this.charts.forEach(chart => {
      chart.data.datasets.forEach(dataset => {
        dataset.borderColor = this.getChartColor();
        dataset.backgroundColor = this.getChartFill();
      });

      chart.options.plugins!.legend!.labels!.color = this.getChartLabelColor();
      chart.options.scales!['x']!.ticks!.color = this.getChartLabelColor();
      chart.options.scales!['x']!.grid!.color = this.getChartGridColor();
      chart.options.scales!['y']!.ticks!.color = this.getChartLabelColor();
      chart.options.scales!['y']!.grid!.color = this.getChartGridColor();

      chart.update();
    });
  }

  /** 🎨 Métodos que devuelven los colores dependiendo del modo oscuro o claro */
  getChartColor(): string {
    return this.darkModeService.isDark() ? '#00FFFF' : '#0A2740'; // Azul cyan (oscuro) / Azul oscuro (claro)
  }

  getChartFill(): string {
    return this.darkModeService.isDark() ? 'rgba(0, 255, 255, 0.3)' : 'rgba(10, 39, 64, 0.3)'; // Transparencia
  }

  getChartLabelColor(): string {
    return this.darkModeService.isDark() ? '#00FFFF' : '#0A2740';
  }

  getChartGridColor(): string {
    return this.darkModeService.isDark() ? 'rgba(0, 255, 255, 0.2)' : 'rgba(10, 39, 64, 0.2)';
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
        dataset.data.push(this.getRandomValue(index));
        if (dataset.data.length > 7) {
          dataset.data.shift();
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
      [15, 40], [30, 80], [0, 1000], [950, 1050], [2, 400], [30, 90], [0, 100], [0, 5], [10, 500], [0, 100]
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

  ngOnInit() {
    this.darkModeService.loadTheme();
    this.darkModeService.darkMode$.subscribe(() => {
      this.updateChartColors();
    });
  }
}
