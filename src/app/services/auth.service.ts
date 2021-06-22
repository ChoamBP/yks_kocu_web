import { UserUpdateModel } from './../model/userUpdateModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/loginModel';
import { UserLoginResponseModel } from '../model/userLoginResponseModel';
import { UserRegisterModel } from '../model/userRegisterModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://yksapp.herokuapp.com/api/user/";
  constructor(private httpClient:HttpClient,
      private localStorageService:LocalStorageService) { }
 

  login(loginModel:LoginModel):Observable<UserLoginResponseModel>{
    let newUrl=this.apiUrl+"check_user/"+loginModel.email+"/"+loginModel.password;
    return this.httpClient.get<UserLoginResponseModel>(newUrl);
  }

  register(registerModel:UserRegisterModel):Observable<boolean>{
    let newUrl=this.apiUrl+"register";
    return this.httpClient.post<boolean>(newUrl,registerModel);
  }
  update(updateModel:UserUpdateModel):Observable<boolean>{
    let newUrl=this.apiUrl+"update";
    return this.httpClient.post<boolean>(newUrl,updateModel);
  }

  isAuthenticated():boolean{
    if(localStorage.getItem("currentUser")==null){
      return false;
    }
    else{
      return true;
    }
  }
}
