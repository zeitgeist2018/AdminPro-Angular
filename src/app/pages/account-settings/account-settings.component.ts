import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settingsService: SettingsService) { }

  ngOnInit() {
    this.setCheck();
  }

  changeTheme(link: any) {
    this.applyCheckMark(link);
    const theme = link.getAttribute('data-theme');
    this._settingsService.applyTheme(theme);
    this._settingsService.saveSettings();
  }

  applyCheckMark(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const selector of selectors) {
      selector.classList.remove('working');
    }
    link.classList.add('working');
  }

  setCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this._settingsService.settings.theme;
    for (const selector of selectors) {
      if (selector.getAttribute('data-theme') === theme) {
        selector.classList.add('working');
        break;
      }
    }
  }
}
