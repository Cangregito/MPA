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

  constructor(
    private darkModeService: DarkModeService,
    public translationService: TranslationService,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.darkModeService.loadTheme();
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
