import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AppLayoutService } from '../../services/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { BaseLayoutComponent } from '../../../core/base/base.layout.component';
import { TranslateService } from '@ngx-translate/core';
import {AuthFirebaseService} from "../../../core/services/auth.firebase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, AppMenuitemComponent],
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(
    public layoutService: AppLayoutService,
    private renderer2: Renderer2,
    private authService: AuthFirebaseService,
    translate: TranslateService,
    private router: Router) { }


  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
      },
      {
        label: 'Firestore',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Ingresos y Egresos',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Detalles',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/dashboard/redux/detail'],
              },
              {
                label: 'Estadistica',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/dashboard/redux/charts'],
              },
              {
                label: 'Ingreso y egreso',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/dashboard/redux/ingreso-egreso'],
              },
            ],
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-out',
                command: () =>{
                 this.logout();
                }
              }
            ],
          },
        ],
      },
    ];
  }

  private logout() {
    this.authService.logout().then( ()=>{
      this.router.navigate(['/auth/login']);
    });
  }
}
