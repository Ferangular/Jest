import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, signOut,
} from '@angular/fire/auth';

import {Credential} from "../interfaces/credential";

import {UserFirebase} from "../models/user.firebase";
import {Firestore, onSnapshot} from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";

import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import * as authActions from '../auth/auth.actions';
import {unSetUser} from "../auth/auth.actions";
@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);
  userUnsubscribe!: Unsubscribe;
  constructor( private firestore: Firestore,
               private store: Store<AppState>) {
    this.initAuthListener();
  }

  initAuthListener() {
    this.auth.onAuthStateChanged( fuser => {
      if (fuser) {
        // this.userUnsubscribe = onSnapshot(
        //   doc(this.firestore, fuser.uid, 'user'),
        //   (docUser: any) => {
        //     console.log(docUser.data())
        //     let data: any = docUser.data();
        //     let user = UserFirebase.fromFirebase(data);
        //     this.store.dispatch(authActions.setUser({ user }));
        //   },
        //   (err => {
        //     console.log(err);
        //   })
        // );
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, `${fuser.uid}/user`),
          (docUser: any) => {
            // console.log(docUser.data())
            let data: any = docUser.data();
            let user = UserFirebase.fromFirebase(data);
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err) => {
            console.log(err);
          }
        );

      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(unSetUser());
      }
    });
  }

  // signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
  //   return createUserWithEmailAndPassword( this.auth, credential.email, credential.password   );
  // }
  signUpWithEmailAndPassword(credential: Credential) {
    return createUserWithEmailAndPassword( this.auth, credential.email, credential.password   ).then(
      ({user})=>{
        const newUser: UserFirebase = {displayName: credential.displayName, email: user.email!, uid: user.uid};
        const collectionRef = collection(this.firestore, `${user.uid}`);
        const documentRef = doc(collectionRef, 'user');
        setDoc(documentRef, newUser).then(()=>{
          this.store.dispatch(authActions.setUser({user: newUser}));
        });
      });
  }


  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }


  // providers

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);

      return result;
    } catch (error: any) {
      return error;
    }
  }

//
  logout(): Promise<void> {
    return signOut(this.auth);
  }
  logOut(): Promise<void> {
    return this.auth.signOut();
  }


}
