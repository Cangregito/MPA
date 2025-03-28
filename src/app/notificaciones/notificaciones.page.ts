import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NotificacionesPage implements OnInit {
  notificaciones = [
    { titulo: 'Nuevo mensaje', mensaje: 'Tienes un nuevo mensaje en la app', icono: 'mail-outline' },
    { titulo: 'Actualización', mensaje: 'Se ha actualizado tu perfil correctamente', icono: 'refresh-outline' },
    { titulo: 'Recordatorio', mensaje: 'No olvides completar tu tarea pendiente', icono: 'alarm-outline' },
  ];

  ngOnInit() {
  }
}
