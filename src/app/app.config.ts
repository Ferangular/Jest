import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject, isDevMode } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
// APP ROUTE
import { routes } from './app.routes';
// APP SETTINGS
import { AppSettingsService } from './core/services/app-settings.service';
// NGX TRANSLATE
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// fIRABASE
import { provideServiceWorker } from '@angular/service-worker';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {firebaseProviders} from "./firebase.config";
//NGRX
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore, StoreModule} from "@ngrx/store";
import {appReducers} from "./app.reducer";



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    // importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(routes, withComponentInputBinding(),
    // this is in place of scrollPositionRestoration: 'disabled',
    withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
    // in place of initialNavigation: 'enabledBlocking'
    withEnabledBlockingInitialNavigation(),
    // same configuration
    withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
    })),
    // importProvidersFrom(
    //  AngularFireModule.initializeApp(environment.firebaseConfig)
    // ),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        }, // required for translation
    })),
    // FIREBASE
    importProvidersFrom(provideFirestore(() => getFirestore())),
    firebaseProviders,
    // SETTINGS
    AppSettingsService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [HttpClient],
        multi: true,
    },
   // PWA
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
    }),
    // NGRX
    provideStore(),
  importProvidersFrom(
    StoreModule.forRoot(appReducers),
  ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    })
],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n_languajes/', '.json');
}

export function initializeApp() {
  const translate = inject(TranslateService);
  const appSettings = inject(AppSettingsService);
  return (): Promise<any> => {
    return new Promise<void>((resolve) => {
      appSettings.load().subscribe({
        next: () => {
          // Puedes realizar acciones adicionales después de cargar las configuraciones si es necesario
          translate.setDefaultLang('es_ES');
          translate.use('es_ES');
          resolve(); // Resuelve la promesa una vez que las configuraciones se hayan cargado
        },
        error: (error) => {
          console.error('Error al cargar las configuraciones:', error);
          resolve(); // Resuelve la promesa incluso si hay un error (puedes ajustar este comportamiento según tu necesidad)
        },
      });
    });
  };
}

//     importProvidersFrom(BrowserModule, AppRoutingModule),
// { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
// provideRouter(
//   routes,
//
//   withComponentInputBinding(),
// ),
