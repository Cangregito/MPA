import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink]
})
export class RegistroPage implements OnInit {

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.loadTheme();
  }

}
