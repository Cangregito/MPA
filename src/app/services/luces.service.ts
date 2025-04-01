import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LucesService {
  private apiUrl = 'http://192.168.88.200:3000/luces'; 

  constructor(private http: HttpClient) {}

  obtenerLuces(edificio: string): Observable<{ [key: string]: boolean }> {
    return this.http.get<{ [key: string]: boolean }>(`${this.apiUrl}/estado/${edificio}`);
  }

  actualizarLuz(edificio: string, key: string, estado: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar`, { edificio, key, estado });
  }
}
