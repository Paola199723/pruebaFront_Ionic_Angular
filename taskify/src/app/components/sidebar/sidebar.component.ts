import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}