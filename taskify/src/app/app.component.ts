import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {}