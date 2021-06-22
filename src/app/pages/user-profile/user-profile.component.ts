import { Component, OnInit } from '@angular/core';
import { TargetUniversity } from 'src/app/model/targetUniversity';
import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TargetUniversityService } from 'src/app/services/target-university.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:UserLoginResponseModel={_id:"",class:1,email:"",gender:"",name:"",password:"",profile_picture_url:"",username:""};
  targetUniversity:TargetUniversity={_id:"",section:"Ayarlardan",target_department:"Hedeflerinizi",target_point:0,target_university:"Güncelleyin"};
  constructor(private localStorageService:LocalStorageService,
    private targetUniversityService:TargetUniversityService) { }

  ngOnInit(): void {
    this.user=this.localStorageService.getCurrentUser();
    this.getTargetUniversity(this.user._id)
    
    if(this.user.profile_picture_url.trim()===""){
      this.user.profile_picture_url="https://firebasestorage.googleapis.com/v0/b/ykskocu-a2caf.appspot.com/o/f5608f87-5a68-4eca-8624-7cdfaed23a2d?alt=media&token=a0b39b77-b820-44a5-8922-3117c7b7c01b";
    }
    
  }

  getTargetUniversity(id:string){
    this.targetUniversityService.getTargetUniversity(id).subscribe(response=>{
      this.targetUniversity=response;
      
    })
  }

}
