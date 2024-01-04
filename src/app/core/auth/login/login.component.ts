import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AppLayoutService} from '../../../layout/services/app.layout.service';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {InputTextModule} from 'primeng/inputtext';
import {Credential} from "../../interfaces/credential";

import Swal from 'sweetalert2'
import {BtnProvidersComponent} from "../../components/btn-providers/btn-providers.component";
import {AuthFirebaseService} from "../../services/auth.firebase.service";
import {Subject, Subscription, takeUntil} from "rxjs";
// store
import {AppState} from "../../../app.reducer";
import {Store} from "@ngrx/store";

import * as ui from "../../../shared/ui.actions";
import {swalHelper} from "../../../helpers/swal.helper";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PasswordModule, CheckboxModule, FormsModule, RouterLink, ButtonModule, RippleModule, InputTextModule, ReactiveFormsModule, BtnProvidersComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  valCheck: string[] = ['remember'];

  password!: string;
  cargando: boolean = false;
  uiSubscription: Subscription;


  constructor(public layoutService: AppLayoutService,
              private authService: AuthFirebaseService,
              private store: Store<AppState>,
              private fb: FormBuilder,
              private router: Router
  ) {
    this.loginForm = this.fb.group({});
    this.uiSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.uiSubscription = this.store.select('ui').subscribe({
      next: (ui) => {
        this.cargando = ui.isLoading;
        // console.log('cargando subscribe', this.cargando);
      }
    });
  }


  login() {

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    // swalHelper.alertProgressBar('Auto close alert!', 'I will close in <b></b> milliseconds.', 600, true);


    const {email, password} = this.loginForm.value;

    const credential: Credential = {
      email: email || '',
      password: password || '',
    };

    this.authService.logInWithEmailAndPassword(credential)
      .then(credenciales => {
        // console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });

  }


  initForm() {
    this.loginForm = this.fb.group({
      email: ['fer@gmail.com', [Validators.required, Validators.email]],
      password: ['F123456789r', Validators.required],
      remember: [false]
    });
  }

}
