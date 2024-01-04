import {UserMetadata} from "../interfaces/user.firebase.interface";

export class UserFirebase {

  // @ts-ignore
  static fromFirebase( { email, uid , displayName } ) {
    return new UserFirebase( uid, email ,displayName );
  }


  constructor(
   public uid: string,
   public email: string,
   public displayName?: string,
   public role?: string,
   public phoneNumber?: string,
   public photoURL?: string,
   public emailVerified?: boolean,
   public metadata?: UserMetadata,
   public isAnonymous?: boolean,
   public accessToken?: string,
   public providerIds?: string
  ) {  }



}



