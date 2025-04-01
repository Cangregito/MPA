import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuLucesComponent } from './menu-luces.component';
import { TranslationService } from '../services/translation.service'; // Servicio de traducción
import { DarkModeService } from '../services/dark-mode.service';
import { LucesService } from '../services/luces.service'; // Servicio para comunicación con Node.js

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LucesPage implements OnInit {
  private modalCtrl = inject(ModalController);
  private popoverCtrl = inject(PopoverController);

  // Lista de claves de traducción para los salones
  salonesKeys: string[] = [
    'SALON_I_001', 'SALON_I_002', 'SALON_I_003', 'SALON_I_004',
    'SALON_I_101', 'SALON_I_102', 'SALON_I_103', 'SALON_I_104',
    'SALON_I_PASILLO_1', 'SALON_I_PASILLO_2'
  ];

  estadoLuces: { [key: string]: boolean } = {}; // Objeto con el estado de cada luz

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService, // Servicio de traducción
    private lucesService: LucesService // Servicio para comunicación con el backend
  ) {}

  ngOnInit() {
    this.darkModeService.loadTheme();
    this.cargarEstadoLuces(); // Cargar el estado inicial de las luces desde el backend
  }

  // Método para obtener el nombre traducido de un salón
  getSalonName(key: string): string {
    return this.translationService.getTranslation(key);
  }

  cargarEstadoLuces() {
    const edificio = 'EDIFICIO_I';
  
    this.lucesService.obtenerLuces(edificio).subscribe({
      next: (luces) => {
        console.log('📥 Estado de luces recibido desde BD:', luces);
  
        this.estadoLuces = this.mapearLucesDesdeDB(luces);
        console.log('🔄 Estado de luces mapeado:', this.estadoLuces);
      },
      error: (error) => {
        console.error('❌ Error al cargar el estado de las luces:', error);
      }
    });
  }
  

  private mapearLucesDesdeDB(lucesDB: { [key: string]: boolean }): { [key: string]: boolean } {
    const mapping: Record<string, string> = {
      a001: 'SALON_I_001',
      a002: 'SALON_I_002',
      a003: 'SALON_I_003',
      a004: 'SALON_I_004',
      a101: 'SALON_I_101',
      a102: 'SALON_I_102',
      a103: 'SALON_I_103',
      a104: 'SALON_I_104',
      apas1: 'SALON_I_PASILLO_1',
      apas2: 'SALON_I_PASILLO_2'
    };
  
    let lucesMapeadas: { [key: string]: boolean } = {};
    for (const claveBD in lucesDB) {
      if (mapping.hasOwnProperty(claveBD)) {
        lucesMapeadas[mapping[claveBD]] = lucesDB[claveBD];
      }
    }
    return lucesMapeadas;
  }

  private mapearLuzParaDB(key: string): string | null {
    const mappingInvertido: Record<string, string> = {
      'SALON_I_001': 'a001',
      'SALON_I_002': 'a002',
      'SALON_I_003': 'a003',
      'SALON_I_004': 'a004',
      'SALON_I_101': 'a101',
      'SALON_I_102': 'a102',
      'SALON_I_103': 'a103',
      'SALON_I_104': 'a104',
      'SALON_I_PASILLO_1': 'apas1',
      'SALON_I_PASILLO_2': 'apas2'
    };
  
    return mappingInvertido[key] || null;
  }


  toggleLuz(key: string) {
    const claveBD = this.mapearLuzParaDB(key);
    if (!claveBD) {
      console.error(`❌ No se encontró la clave en la BD para ${key}`);
      return;
    }
  
    const edificio = 'EDIFICIO_I'; // 🔹 Ajusta según tu configuración
  
    console.log(`📡 Enviando actualización: ${claveBD} -> ${this.estadoLuces[key]}`);
  
    this.lucesService.actualizarLuz(edificio, claveBD, this.estadoLuces[key]).subscribe({
      next: (response) => {
        console.log(`✅ Luz ${key} actualizada correctamente en la BD.`);
      },
      error: (error) => {
        console.error(`❌ Error al actualizar la luz ${key}:`, error);
      }
    });
  }

  async openMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: MenuLucesComponent,
      event: event,
      translucent: true
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.handleMenuAction(data);
    }
  }

  handleMenuAction(data: any) {
    if (data.action === 'all') {
      this.toggleAllLights();
    } else if (data.action === 'zone') {
      this.toggleZone(data.zone);
    } else if (data.action === 'floor') {
      this.toggleFloor(data.building, data.floor);
    }
  }

  toggleAllLights() {
    const allOn = Object.values(this.estadoLuces).every(luz => luz);
    Object.keys(this.estadoLuces).forEach(key => {
      this.estadoLuces[key] = !allOn;
    });
  }

  toggleZone(zone: string) {
    this.salonesKeys.forEach((key) => {
      if (key.startsWith(zone) || key.includes(zone)) {
        this.estadoLuces[key] = !this.estadoLuces[key];
      }
    });
  }

  toggleFloor(building: string, floor: string) {
    const floorPrefix = floor === 'baja' ? '00' : '10'; // Identifica los números de piso
    this.salonesKeys.forEach((key) => {
      if (key.startsWith(`${building}-${floorPrefix}`)) {
        this.estadoLuces[key] = !this.estadoLuces[key];
      }
    });
  }
}
