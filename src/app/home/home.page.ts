import { Component } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.loadTheme();
  }
}
