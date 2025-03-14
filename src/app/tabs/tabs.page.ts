import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [IonicModule, RouterLink, RouterLinkActive]
})
export class TabsPage {
  pageTitle = 'MPA'; 

  setTitle(title: string) {
    this.pageTitle = title;
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        document.body.className = ''; // Elimina cualquier clase previa
        if (event.url.includes('/tabs/inicio')) {
          document.body.classList.add('page-inicio');
        } else if (event.url.includes('/tabs/parametros')) {
          document.body.classList.add('page-parametros');
        } else if (event.url.includes('/tabs/estados')) {
          document.body.classList.add('page-estados');
        } else if (event.url.includes('/tabs/perfil')) {
          document.body.classList.add('page-perfil');
        }
      }
    });
  }
}
