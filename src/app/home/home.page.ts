import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController 
  ) {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async login() {
    if (!this.email || !this.password) {
      this.showAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('Inicio de sesión exitoso:', user);
      this.router.navigate(['/tabs/inicio']);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            this.showAlert('Error', 'Usuario no encontrado. Verifica tu email.');
            break;
          case 'auth/wrong-password':
            this.showAlert('Error', 'Contraseña incorrecta.');
            break;
          case 'auth/invalid-email':
            this.showAlert('Error', 'Formato de email inválido.');
            break;
          case 'auth/user-disabled':
            this.showAlert('Error', 'Este usuario ha sido deshabilitado.');
            break;
          case 'auth/invalid-credential':
            this.showAlert('Error', 'Correo o contraseña incorrecta.');
            break;
          default:
            this.showAlert('Error', `Error desconocido: ${error.message}`);
        }
      } else {
        this.showAlert('Error', 'Ocurrió un error inesperado.');
      }
    }
  }

  // ✅ LOGIN con Google
  async loginWithGoogle() {
    try {
      const user = await this.authService.loginWithGoogle();
      console.log('Inicio de sesión con Google:', user);
      this.router.navigate(['/tabs/inicio']);
    } catch (error) {
      console.error('Error con Google:', error);
      this.showAlert('Error', 'No se pudo iniciar sesión con Google.');
    }
  }

  // ✅ LOGIN con Microsoft
  async loginWithMicrosoft() {
    try {
      const user = await this.authService.loginWithMicrosoft();
      console.log('Inicio de sesión con Microsoft:', user);
      this.router.navigate(['/tabs/inicio']);
    } catch (error) {
      console.error('Error con Microsoft:', error);
      this.showAlert('Error', 'No se pudo iniciar sesión con Microsoft.');
    }
  }

  async resetPassword() {
    if (!this.email) {
      this.showAlert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }
  
    try {
      await this.authService.resetPassword(this.email);
      this.showAlert('Éxito', 'Se ha enviado un correo de recuperación.');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.showAlert('Error', 'No existe una cuenta con este correo.');
      } else if (error.code === 'auth/invalid-email') {
        this.showAlert('Error', 'Formato de correo inválido.');
      } else {
        this.showAlert('Error', 'Ocurrió un error inesperado.');
      }
    }
  }
}
