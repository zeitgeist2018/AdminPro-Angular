import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  public settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document, ) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
    this.applyTheme(this.settings.theme);
  }

  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme')
      .setAttribute('href', url);
    this.settings.themeUrl = url;
    this.settings.theme = theme;
  }

}

interface Settings {
  themeUrl: string;
  theme: string;
}
