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
          borderColor: this.getCssVariable('--chart-linea'),
          backgroundColor: this.getCssVariable('--chart-fill'),
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: this.getCssVariable('--chart-label') }
          }
        },
        scales: {
          x: {
            ticks: { color: this.getCssVariable('--chart-label') },
            grid: { color: this.getCssVariable('--chart-grid') }
          },
          y: {
            ticks: { color: this.getCssVariable('--chart-linea') },
            grid: { color: this.getCssVariable('--chart-grid') }
          }
        }
      }
    });
  }
  
  updateChartColors() {
      this.charts.forEach(chart => {
        chart.data.datasets.forEach(dataset => {
          dataset.borderColor = this.getCssVariable('--chart-linea');
          dataset.backgroundColor = this.getCssVariable('--chart-fill');
        });
  
        chart.options.plugins!.legend!.labels!.color = this.getCssVariable('--chart-label');
        chart.options.scales!['x']!.ticks!.color = this.getCssVariable('--chart-label');
        chart.options.scales!['x']!.grid!.color = this.getCssVariable('--chart-grid');
        chart.options.scales!['y']!.ticks!.color = this.getCssVariable('--chart-label');
        chart.options.scales!['y']!.grid!.color = this.getCssVariable('--chart-grid');
  
        chart.update();
      });
  }
  
  
  
  

  getCssVariable(variable: string): string {
    document.documentElement.style.display = "none";  // Ocultar temporalmente
    document.documentElement.offsetHeight; // Forzar reflow
    document.documentElement.style.display = ""; // Restaurar
  
    return window.getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
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
