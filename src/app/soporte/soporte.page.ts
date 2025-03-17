import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class SoportePage implements OnInit {
  mensaje: string = ''; // Mensaje a redactar

  problemasFrecuentes = [
    { 
      titulo: 'No puedo conectarme al servidor', 
      solucion: 'Verifica que tu conexión a Internet esté funcionando correctamente. Si estás en Wi-Fi, prueba reiniciando el router. Si estás en datos móviles, asegúrate de que tengas cobertura y saldo disponible. También revisa que el servidor no esté en mantenimiento o fuera de línea.' 
    },
    { 
      titulo: 'El sistema no responde o se congela', 
      solucion: 'Cierra la aplicación completamente y vuelve a abrirla. Si el problema persiste, intenta reiniciar tu dispositivo. Asegúrate de que la aplicación esté actualizada a la última versión disponible en la tienda de aplicaciones. También verifica si otros usuarios están experimentando el mismo problema, ya que podría ser un fallo general del sistema.' 
    },
    { 
      titulo: 'Error al enviar datos', 
      solucion: 'Asegúrate de que los datos ingresados sean correctos y cumplan con los requisitos del sistema. Revisa si hay algún campo obligatorio sin completar. Si el problema persiste, prueba cerrando sesión y volviendo a iniciar. También puedes intentar en otro dispositivo o navegador.' 
    },
    { 
      titulo: 'No recibo notificaciones', 
      solucion: 'Verifica que las notificaciones estén habilitadas en la configuración de la aplicación y del sistema operativo. En dispositivos Android, revisa que la aplicación tenga permisos para enviar notificaciones. En iOS, asegúrate de que "No Molestar" no esté activado.' 
    },
    { 
      titulo: 'Olvidé mi contraseña', 
      solucion: 'Usa la opción "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión. Ingresa tu correo registrado y sigue las instrucciones enviadas a tu bandeja de entrada. Si no recibes el correo, revisa la carpeta de spam o intenta de nuevo después de unos minutos.' 
    },
    { 
      titulo: 'La aplicación se cierra sola', 
      solucion: 'Revisa si tienes suficiente espacio de almacenamiento en tu dispositivo. También puede ayudar desinstalar y volver a instalar la aplicación. Si el problema ocurre después de una actualización, verifica si hay algún parche disponible o espera a una nueva versión con correcciones.' 
    },
    { 
      titulo: 'El sitio web no carga correctamente', 
      solucion: 'Prueba a limpiar la caché y cookies de tu navegador. Si el problema continúa, intenta abrir el sitio en otro navegador o dispositivo. También verifica si hay problemas en la red o si el servidor está en mantenimiento.' 
    },
    { 
      titulo: 'Los datos no se actualizan en tiempo real', 
      solucion: 'Asegúrate de que tienes una conexión a Internet estable. En algunos casos, la información puede tardar unos minutos en actualizarse debido a la sincronización con el servidor. También puedes probar cerrando y volviendo a abrir la aplicación.' 
    }
  ];

  constructor() {}

  ngOnInit() {}
}
