import { Injectable, OnInit, Renderer2 } from '@angular/core';
import { iSideBarMenu, iSidebarMenuRxjs } from '../models/app-settings';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '../services/app-settings.service';
import { ajax } from 'rxjs/internal/ajax/ajax';
import { environment } from '../../../environments/environment';
import { AppLayoutService } from '../../layout/services/app.layout.service';
import { Model } from '../interfaces/app.settings.interface';

@Injectable({
  providedIn: 'root',
})
export class BaseLayoutComponent implements OnInit {
  public sidebarMenuRxjs: iSidebarMenuRxjs[] = [];

  public modelSettings: Model[] = [];

  constructor(renderer2: AppLayoutService, translate: TranslateService) {
    const appSettings = AppSettingsService.appSettings['model'];
    this.modelSettings.push(...appSettings);
  }
  ngOnInit(): void {
    this.load();
    const appSettings = AppSettingsService.appSettings['sideBarMenuRxjs'];
    console.log(appSettings)
    if (Array.isArray(appSettings)) {
      this.sidebarMenuRxjs.push(...appSettings);
      console.log(this.sidebarMenuRxjs);
      console.log('this.sidebarMenu', this.sidebarMenuRxjs)
    }
  }
  load() {
    const obs$ = ajax.getJSON(environment.jsonFile);
    obs$.subscribe((data: any) => {
      console.log(data);
      // this.flagsCountries = data.flags;
    });
  }
}
