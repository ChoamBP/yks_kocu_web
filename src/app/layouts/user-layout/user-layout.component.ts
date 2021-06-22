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

    if(this.user.profile_picture_url.trim()===""){
      this.user.profile_picture_url="https://firebasestorage.googleapis.com/v0/b/ykskocu-a2caf.appspot.com/o/f5608f87-5a68-4eca-8624-7cdfaed23a2d?alt=media&token=a0b39b77-b820-44a5-8922-3117c7b7c01b";
    }
    
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
