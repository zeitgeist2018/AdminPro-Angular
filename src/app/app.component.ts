import { Component } from '@angular/core';
import { SettingsService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsService]
})
export class AppComponent {


  constructor(private _settingsService: SettingsService) {

  }
}
