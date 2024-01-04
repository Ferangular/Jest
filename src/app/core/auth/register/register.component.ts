import {Component, OnDestroy, OnInit} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AppLayoutService } from '../../../layout/services/app.layout.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {Router, RouterLink} from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {AuthFirebaseService} from "../../services/auth.firebase.service";

import Swal from "sweetalert2";
import {Credential} from "../../interfaces/credential";
import {BtnProvidersComponent} from "../../components/btn-providers/btn-providers.component";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducer";
import * as ui from "../../../shared/ui.actions";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CheckboxModule, PasswordModule, FormsModule, ButtonModule, RippleModule, RouterLink, InputTextModule, ReactiveFormsModule, BtnProvidersComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit,OnDestroy {


  registerForm: FormGroup;
  cargando: boolean = false;
  uiSubscription:Subscription;


  constructor(public layoutService: AppLayoutService,
              private fb: FormBuilder,
              private authFirebase: AuthFirebaseService,
              private store: Store<AppState>,
              private router: Router) {
    this.registerForm = this.fb.group({});
    this.uiSubscription= new Subscription();
  }




  initForm(){
    this.registerForm = this.fb.nonNullable.group({
      displayName: ['Fer', Validators.required],
      email: ['fer@gmail.com', [Validators.required, Validators.email]],
      password: ['F123456789r', Validators.required ],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.uiSubscription = this.store.select('ui').subscribe({
      next: (ui) => {
        this.cargando = ui.isLoading;
        console.log('cargando subscribe', this.cargando);
      }
    });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  createUser() {

    if ( this.registerForm.invalid ) { return; }

    const { displayName, email, password } = this.registerForm.value;


    this.store.dispatch(ui.isLoading());
    const credential: Credential = {
      email: email ,
      displayName: displayName ,
      password: password,
    }

  this.authFirebase.signUpWithEmailAndPassword( credential).then(
      credential => {
          console.log(credential);
          // Swal.close();
        this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
      }
    ).catch(
      error =>{
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      }
    )


  }
}
