import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AppLayoutService } from '../../services/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { BaseLayoutComponent } from '../../../core/base/base.layout.component';
import { TranslateService } from '@ngx-translate/core';
import {AuthFirebaseService} from "../../../core/services/auth.firebase.service";
import {Router} from "@angular/router";
import { Model } from '../../../core/interfaces/app.settings.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, AppMenuitemComponent],
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss'],
})
export class AppMenuComponent extends BaseLayoutComponent  implements OnInit {
  model: any[] = [
    {
      "label": "Cerrar sesión",
      "icon": "pi pi-fw pi-user",
      "items": [
        {
          label: "Login",
          icon: "pi pi-fw pi-sign-out",
          command: () =>{
            this.logout();
          }
        }
      ]
    }
  ];

  constructor(
    public layoutService: AppLayoutService,
    private renderer2: Renderer2,
    private authService: AuthFirebaseService,
    translate: TranslateService,
    private router: Router) {
    super(layoutService, translate);
  }


  override ngOnInit() {
    this.model.unshift(...this.modelSettings)
      console.log(this.model)
  }

  private logout() {
    this.authService.logout().then( ()=>{
      this.router.navigate(['/auth/login']);
    });
  }
}
