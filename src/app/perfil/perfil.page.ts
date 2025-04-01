import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { TranslationService } from '../services/translation.service';
import { DarkModeService } from '../services/dark-mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PerfilPage implements OnInit {
  user: any = null; // Variable para almacenar los datos del usuario

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.darkModeService.loadTheme();
    await this.loadUserData(); // Cargar datos del usuario
  }

  async loadUserData() {
    try {
      this.user = await this.authService.getUserData();
      console.log('👤 Usuario cargado:', this.user);
    } catch (error) {
      console.error('❌ Error al obtener datos del usuario:', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/home']); // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
