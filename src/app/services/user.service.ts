import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Injectable()
export class UserService {

  public user:any = null;

  constructor(private af: AngularFire) {
    this._getUserFromLocalStorage();
  }

  login(uid, email) {
    // Get user
    this.user = {
      uid: uid,
      email: email
    };

    // Save user in local storage
    localStorage.setItem('ss-user', JSON.stringify(this.user));
  }

  logOut(){
    this.user = null;
    localStorage.removeItem('ss-user');
  }

  // Get user data from local storage if it is authorized
  private _getUserFromLocalStorage(){
    var userDataString = localStorage.getItem('ss-user');
    
    if (userDataString) {
      var userDataJson = JSON.parse(userDataString);
      this.user = {
        uid: userDataJson.uid,
        email: userDataJson.email
      }
    }
  }

}
