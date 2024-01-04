import {EnvironmentProviders, importProvidersFrom} from "@angular/core";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";


const firebaseProviders: EnvironmentProviders = importProvidersFrom ([
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth( () => getAuth()),

])
export {firebaseProviders};

/*

importProvidersFrom(provideFirebaseApp(() => initializeApp(
{"projectId":"redux-9854e",
"appId":"1:1090710654063:web:d6254573f8cbd2ea42519a",
"storageBucket":"redux-9854e.appspot.com",
"apiKey":"AIzaSyASkXFUdlI8tVbMnLiGVAhgOEnLlo18NQA",
"authDomain":"redux-9854e.firebaseapp.com",
"messagingSenderId":"1090710654063",
"measurementId":"G-0LCWHDK0QP"})))
importProvidersFrom(provideAuth(() => getAuth())),


 */
