import { Injectable } from '@angular/core';
import { AppSettings } from '../models/app-settings';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

const jsonFile = 'assets/app-settings/app-settings.json';
@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  static appSettings: AppSettings;

  constructor(private http: HttpClient) {}

  load(): Observable<AppSettings> {
    return this.http.get<AppSettings>(jsonFile).pipe(
      tap((response) => {
        AppSettingsService.appSettings = response;
      }),
      catchError((error) => {
        throw error;
      }),
    );
  }
}
