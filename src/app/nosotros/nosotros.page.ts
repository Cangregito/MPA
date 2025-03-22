import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class NosotrosPage implements OnInit {

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.loadTheme();
  }

}
