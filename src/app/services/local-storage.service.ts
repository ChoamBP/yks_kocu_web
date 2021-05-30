import { Injectable } from '@angular/core';
import { UserLoginResponseModel } from '../model/userLoginResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  currentUser:string="currentUser";

  constructor() { }


  setCurrentUser(user:UserLoginResponseModel){
    localStorage.setItem(this.currentUser,JSON.stringify(user));
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem(this.currentUser) ||'{}');
  }

  removeUser(){
    localStorage.clear();
  }

}
