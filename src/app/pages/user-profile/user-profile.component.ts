import { Component, OnInit } from '@angular/core';
import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:UserLoginResponseModel={_id:"",class:1,email:"",gender:"",name:"",password:"",profile_picture_url:"",username:""};
  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.user=this.localStorageService.getCurrentUser();
  }

}
