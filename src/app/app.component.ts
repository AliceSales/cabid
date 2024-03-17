import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwUpdate } from '@angular/service-worker';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public installPromptEvent: any;
  constructor(private swUpdate: SwUpdate) {}

  getInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.installPromptEvent = e;
    })
  }

  askUserToInstallApp() {
    if (this.installPromptEvent) {
      this.installPromptEvent.prompt();
    }
  }
}
