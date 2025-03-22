import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private storageKey = 'darkMode';
  public isDarkMode = false;
  
  // Observable para detectar cambios de tema
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  loadTheme() {
    let darkMode = localStorage.getItem(this.storageKey);
    if (darkMode !== 'enabled' && darkMode !== 'disabled') {
      localStorage.removeItem(this.storageKey);
      darkMode = 'disabled';
    }

    this.isDarkMode = darkMode === 'enabled';
    this.applyTheme();
    this.darkModeSubject.next(this.isDarkMode); // Notificar cambio de tema
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.storageKey, this.isDarkMode ? 'enabled' : 'disabled');
    this.applyTheme();
    this.darkModeSubject.next(this.isDarkMode); // Notificar cambio de tema
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  

  isDark(): boolean {
    return this.isDarkMode;
  }
}
