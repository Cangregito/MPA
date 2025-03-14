import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // ⬅️ Importar CommonModule para usar *ngFor

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // ⬅️ Agregar CommonModule
})
export class EstadosPage implements AfterViewInit {
  @ViewChildren('chartCanvas') chartCanvas!: QueryList<ElementRef>;
  charts: Chart[] = [];

  chartData = [
    { name: 'Temperatura', color: 'rgba(255, 99, 132, 1)' },
    { name: 'Usuarios Activos', color: 'rgba(54, 162, 235, 1)' },
    { name: 'Pedidos Realizados', color: 'rgba(255, 206, 86, 1)' },
    { name: 'Tasa de Conversión', color: 'rgba(75, 192, 192, 1)' },
    { name: 'Ingresos Mensuales', color: 'rgba(153, 102, 255, 1)' },
    { name: 'Costo de Adquisición', color: 'rgba(255, 159, 64, 1)' },
    { name: 'Tiempo en Plataforma', color: 'rgba(99, 255, 132, 1)' },
    { name: 'Nuevos Registros', color: 'rgba(132, 99, 255, 1)' },
    { name: 'Devoluciones', color: 'rgba(255, 99, 255, 1)' },
    { name: 'Productos Vendidos', color: 'rgba(192, 75, 75, 1)' },
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdRef.detectChanges(); // Forzar detección de cambios
      this.chartCanvas.forEach((canvas, index) => {
        if (canvas.nativeElement) {
          this.createChart(canvas.nativeElement);
        }
      });
    }, 500); // Retraso para asegurarse de que el DOM está listo
  }

  createChart(canvas: any) {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Datos',
          data: this.getRandomData(),
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
            labels: {
              color: 'rgb(7, 85, 164)' // 🔹 Texto de la leyenda en azul oscuro
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'rgb(0, 3, 167)' // 🔹 Texto del eje X en azul oscuro
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)' // 🔹 Líneas de la cuadrícula en gris claro
            }
          },
          y: {
            ticks: {
              color: 'rgb(0, 51, 102)' // 🔹 Texto del eje Y en azul oscuro
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)' // 🔹 Líneas de la cuadrícula en gris claro
            }
          }
        }
      }
    });
  }
  

  getRandomData() {
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  }
}
