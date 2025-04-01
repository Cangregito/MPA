import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private apiUrl = 'http://192.168.88.200:3000';

  constructor(private http: HttpClient) {}

  getLatestData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest-data`);
  }

  getSensorHistory(sensorKey: string, edificio: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sensor-history/${sensorKey}/${edificio}`);
  }  
}
