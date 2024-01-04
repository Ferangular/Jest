import {Component, inject, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {AuthFirebaseService} from "../../services/auth.firebase.service";

export type ProviderType = 'github' | 'google';

@Component({
  selector: 'app-btn-providers',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './btn-providers.component.html',
  styleUrl: './btn-providers.component.scss'
})
export class BtnProvidersComponent {
  @Input() isLogin = false;

  private _authService = inject(AuthFirebaseService);
  private _router = inject(Router);

  providerAction(provider: ProviderType): void {
    if (provider === 'google') {
      this.signUpWithGoogle();
    } else {
      this.signUpWithGithub();
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const result = await this._authService.signInWithGoogleProvider();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }

  async signUpWithGithub(): Promise<void> {
    try {
      const result = await this._authService.signInWithGithubProvider();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }
}

