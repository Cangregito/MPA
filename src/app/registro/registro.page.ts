import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { DarkModeService } from '../services/dark-mode.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule] 
})
export class RegistroPage implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.darkModeService.loadTheme();
  }

  async register() {
    if (!this.name || !this.lastname || !this.email || !this.password || !this.confirmPassword) {
      this.showAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.showAlert('Error', 'Ingresa un correo válido.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (this.password.length < 6) {
      this.showAlert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const user = await this.authService.register(this.email, this.password, this.name, this.lastname);
      this.showAlert('Registro Exitoso', 'Tu cuenta ha sido creada.');
      this.router.navigate(['/home']); 
      console.log('Usuario registrado:', user);
    } catch (error: any) {
      this.showAlert('Error', this.getErrorMessage(error.code));
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  getErrorMessage(errorCode: string): string {
    const errors: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado.',
      'auth/invalid-email': 'El correo no es válido.',
      'auth/weak-password': 'La contraseña es muy débil.',
      'auth/operation-not-allowed': 'Registro no habilitado.',
    };
    return errors[errorCode] || 'Ocurrió un error desconocido.';
  }

  async registerWithGoogle() {
    try {
      const user = await this.authService.loginWithGoogle();
      console.log("Usuario registrado con Google:", user);
      this.router.navigate(['/home']); 
    } catch (error) {
      console.error("Error al registrarse con Google:", error);
    }
  }

  async registerWithMicrosoft() {
    try {
      const user = await this.authService.loginWithMicrosoft();
      console.log("Usuario registrado con Microsoft:", user);
      this.router.navigate(['/home']); // Redirigir después del registro exitoso
    } catch (error) {
      console.error("Error al registrarse con Microsoft:", error);
    }
  }
}
