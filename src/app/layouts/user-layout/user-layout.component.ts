import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  user:UserLoginResponseModel={_id:"",class:1,email:"",gender:"",name:"",password:"",profile_picture_url:"",username:""};

  isChecked:boolean=false;
  constructor(private toastr:ToastrService,
    private localStorageService:LocalStorageService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.user=this.localStorageService.getCurrentUser();

    if(this.user.profile_picture_url===""){
      this.user.profile_picture_url="https://bootdey.com/img/Content/avatar/avatar7.png";
    }
    this.toastr.info("burda login yapacaksın user layout on init fonksiyonunda(şifre başka bir yerde değişmiş olabilir diye) ")
  }

  getClass(){
    if(this.isChecked==false){
      return "fas fa-arrow-circle-left";
    }
    return "fas fa-arrow-circle-right";
    
  }

  logout(){
    this.localStorageService.removeUser();
  }
}
