import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../services/dark-mode.service';
import { Subscription } from 'rxjs';
import { SensorDataService } from '../services/sensor-data.service';

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
    { key: 'TEMPERATURA_I_001', edificio: 'I' , parametro: 'temperatura', valor: 'N/A' },
    { key: 'HUMEDAD_I_001', edificio: 'I', parametro: 'humedad', valor: 'N/A' },
    { key: 'RUIDO_I_002', edificio: 'I', parametro: 'sonido', valor: 'N/A' },
    { key: 'METANO_GAS_I_101', edificio: 'I', parametro: 'gas_metano', valor: 'N/A' },
    { key: 'MONOXIDO_CARBONO_I_102', edificio: 'I' , parametro: 'gas_co', valor: 'N/A' },
    { key: 'DIOXIDO_CARBONO_I_103', edificio: 'I' , parametro: 'temperatura', valor: 'N/A' },
    { key: 'HUMO_I_104', edificio: 'I', parametro: 'humo', valor: 'N/A' },
    { key: 'CALIDAD_AIRE', edificio: 'I', parametro: 'calidad_aire', valor: 'N/A' },
    { key: 'TEMPERATURA_H_001', edificio: 'H', parametro: 'temperatura', valor: 'N/A' },
    { key: 'HUMEDAD_H_001', edificio: 'H', parametro: 'humedad', valor: 'N/A' },
    { key: 'TERREMOTO_H_002', edificio: 'H', parametro: 'vibracion', valor: 'N/A' },
    { key: 'HUMO_H_004', edificio: 'H', parametro: 'humo', valor: 'N/A' },
    { key: 'RUIDO_H_101', edificio: 'H', parametro: 'sonido', valor: 'N/A' },
    { key: 'PRESION_H_104', edificio: 'H', parametro: 'presion', valor: 'N/A' },
    { key: 'LUZ_H_101', edificio: 'H', parametro: 'luz', valor: 'N/A' },
  ];

  constructor(private cdRef: ChangeDetectorRef, private darkModeService: DarkModeService,    private sensorDataService: SensorDataService
  ) {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.cdRef.detectChanges();
  
      this.chartCanvas.forEach((canvas, index) => {
        if (canvas?.nativeElement) {
          this.createChart(canvas.nativeElement, index);
        }
      });
  
      this.fetchLatestData();
  
      setInterval(() => {
        this.fetchLatestData(); 
      }, 5000);
    }, 500);
  
    // Suscribirse a cambios en el tema oscuro
    this.themeSubscription = this.darkModeService.darkMode$.subscribe(() => {
      this.updateChartColors();
    });
  }
  
  fetchLatestData() {
    this.sensorDataService.getLatestData().subscribe(
      (data) => {
        console.log("📡 Datos recibidos del servidor:", data);
        this.updateCharts(data);  // 🔥 Actualizar los gráficos con los datos reales
      },
      (error) => console.error('Error obteniendo datos:', error)
    );
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
          label: this.sensores[index].parametro,
          data: this.getRandomData(index),
          borderColor: this.getChartColor(), 
          backgroundColor: this.getChartFill(), 
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

  updateCharts(sensorData: any) {
    const newTimeLabel = this.getCurrentTime();
    this.labels.push(newTimeLabel);
    if (this.labels.length > 7) {
      this.labels.shift();
    }
  
    this.charts.forEach((chart, index) => {
      chart.data.labels = [...this.labels];
  
      // Obtener la clave del sensor correspondiente al gráfico
      const sensorKey = this.sensores[index].key;
  
      // Buscar el dato correspondiente en la última data recibida
      let newValue;
      switch (sensorKey) {
        case 'TEMPERATURA_I_001': newValue = sensorData.temperatura_i; break;
        case 'HUMEDAD_I_001': newValue = sensorData.humedad_i; break;
        case 'RUIDO_I_002': newValue = sensorData.sonido_i; break;
        case 'METANO_GAS_I_101': newValue = sensorData.metano_i; break;
        case 'MONOXIDO_CARBONO_I_102': newValue = sensorData.monoxido_carbono_i; break;
        case 'DIOXIDO_CARBONO_I_103': newValue = sensorData.dioxido_carbono_i; break;
        case 'HUMO_I_104': newValue = sensorData.humo_i; break;
        case 'CALIDAD_AIRE': newValue = sensorData.calidad_aire; break;
        case 'TEMPERATURA_H_001': newValue = sensorData.temperatura_h; break;
        case 'HUMEDAD_H_001': newValue = sensorData.humedad_h; break;
        case 'RUIDO_H_101': newValue = sensorData.sonido_h; break;
        case 'PRESION_H_104': newValue = sensorData.presion_h; break;
        case 'HUMO_H_004': newValue = sensorData.humo_h; break;
        case 'LUZ_H_101': newValue = sensorData.luz_h; break;
        default: newValue = null;
      }
  
      // Si el valor es null o undefined, usa un valor por defecto o el último registrado
      newValue = newValue !== null && newValue !== undefined ? newValue : this.getRandomValue(index);
  
      chart.data.datasets.forEach(dataset => {
        dataset.data.push(newValue);
        if (dataset.data.length > 7) {
          dataset.data.shift();
        }
      });
  
      chart.update();
    });
  }
  

  getRandomData(index: number) {
    return Array(7).fill(0);
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
