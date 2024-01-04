import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, appConfig)
  .then((ref) => {
    console.log('Application is running!');
    // if(window['ngRef']){
    //   window['ngRef'].destroy();
    // }
    // window['ngRef'] = ref;
  })
  .catch((err) => console.error(err));
