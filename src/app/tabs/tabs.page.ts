import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink]
})
export class TabsPage {
  pageTitle = 'MPA'; 
  darkMode = false;

  constructor(private router: Router, private darkModeService: DarkModeService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        document.body.classList.remove('dark-mode'); 
        this.darkModeService.loadTheme(); 
        this.darkMode = this.darkModeService.isDark();

        // Establecer el título de la página según la ruta
        if (event.url.includes('/tabs/inicio')) {
          this.setTitle('Inicio');
        } else if (event.url.includes('/tabs/parametros')) {
          this.setTitle('Parámetros');
        } else if (event.url.includes('/tabs/estados')) {
          this.setTitle('Estados');
        } else if (event.url.includes('/tabs/perfil')) {
          this.setTitle('Perfil');
        }
      }
    });
  }

  ngOnInit() {
    this.darkModeService.loadTheme(); // Asegura que el tema se cargue al iniciar
    this.darkMode = this.darkModeService.isDark(); // Actualizar el valor de darkMode
  }

  setTitle(title: string) {
    this.pageTitle = title;
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode(); // Cambiar entre modo oscuro y claro
    this.darkMode = this.darkModeService.isDark(); // Actualizar el valor de darkMode después del cambio
  }
}
