import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private storageKey = 'language';
  private language: string = 'es'; // Idioma por defecto
  private languageSubject = new BehaviorSubject<string>(this.language);
  language$ = this.languageSubject.asObservable();
  private translations: any = {};

  constructor(private http: HttpClient) {
    this.loadLanguage();
  }

  loadLanguage() {
    const savedLang = localStorage.getItem(this.storageKey) || 'es';
    this.setLanguage(savedLang, false); // No notifica cambios aún
  }

  setLanguage(lang: string, notify = true) {
    this.language = lang;
    localStorage.setItem(this.storageKey, lang);
    this.http.get(`assets/translations/${lang}.json`).subscribe(
      (data) => {
        this.translations = data;
        if (notify) {
          this.languageSubject.next(lang); // Notifica cambio de idioma
        }
      },
      (error) => {
        console.error(`Error loading language file: ${lang}`, error);
      }
    );
  }

  getTranslation(key: string): string {
    return this.translations[key] || key; // Devuelve la clave si no encuentra traducción
  }

  getCurrentLanguage(): string {
    return this.language;
  }
}
