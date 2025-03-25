import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { DarkModeService } from '../services/dark-mode.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, FormsModule, CommonModule]
})
export class TabsPage implements OnInit {
  pageTitle: string = 'MPA';
  darkMode: boolean = false;
  selectedLanguage: string = 'es';
  isTransparentHeader: boolean = false; 
  isLanguageLoaded: boolean = false;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
    public translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.translationService.language$.subscribe(() => {
      this.selectedLanguage = this.translationService.getCurrentLanguage();
      this.updatePageTitle();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
  }
  

  
  ngOnInit() {
    this.darkModeService.loadTheme();
    this.darkMode = this.darkModeService.isDark();
    this.selectedLanguage = this.translationService.getCurrentLanguage();

    setTimeout(() => {
      this.updatePageTitle();
      this.cdr.detectChanges();
    });

    this.translationService.language$.subscribe(() => {
      this.selectedLanguage = this.translationService.getCurrentLanguage();
      this.updatePageTitle();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
  }

  

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  updatePageTitle() {
    if (this.router.url.includes('/tabs/inicio')) {
      this.pageTitle = this.translationService.getTranslation('INICIO');
      this.isTransparentHeader = false;
    } else if (this.router.url.includes('/tabs/parametros')) {
      this.pageTitle = this.translationService.getTranslation('PARAMETROS');
      this.isTransparentHeader = false;
    } else if (this.router.url.includes('/tabs/estados')) {
      this.pageTitle = this.translationService.getTranslation('ESTADOS');
      this.isTransparentHeader = false;
    } else if (this.router.url.includes('/tabs/perfil')) {
      this.pageTitle = "";
      this.isTransparentHeader = true; 
    }

    this.cdr.detectChanges();
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
