import { Injectable, OnInit, Renderer2 } from '@angular/core';
import { iSideBarMenu, iSidebarMenuRxjs } from '../models/app-settings';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from '../services/app-settings.service';
import { ajax } from 'rxjs/internal/ajax/ajax';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseLayoutComponent implements OnInit {
  public sidebarMenuRxjs: iSidebarMenuRxjs[] = [];
  constructor(renderer2: Renderer2, translate: TranslateService) {}
  ngOnInit(): void {
    this.load();
    const appSettings = AppSettingsService.appSettings['sideBarMenuRxjs'];
    if (Array.isArray(appSettings)) {
      this.sidebarMenuRxjs.push(...appSettings);
      console.log(this.sidebarMenuRxjs);
      // console.log('this.sidebarMenu', this.sidebarMenuRxjs)
    }
  }
  load() {
    // const obs$ = ajax.getJSON(environment.jsonFile);
    // obs$.subscribe((data: any) => {
    //   // this.flagsCountries = data.flags;
    // });
  }
}
