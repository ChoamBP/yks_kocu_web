import { UpdatePasswordModel } from '../../model/updatePasswordModel';
import { UserUpdateModel } from './../../model/userUpdateModel';
import { finalize } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginResponseModel } from './../../model/userLoginResponseModel';
import { TargetUniversityService } from './../../services/target-university.service';
import { TargetUniversity } from './../../model/targetUniversity';
import { LocalStorageService } from './../../services/local-storage.service';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {FormGroup,FormBuilder,FormControl, Validators,} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {v4 as uuidv4} from 'uuid';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/model/loginModel';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user:UserLoginResponseModel;
  target:TargetUniversity={_id:"1",section:"Ayarlardan",target_department:"Hedeflerinizi",target_point:0,target_university:"Güncelleyin"};
  userUpdateForm:FormGroup;
  targetUpdateForm:FormGroup;
  updatePasswordForm:FormGroup;
  selectedImg:string="";
  userUpdateModel:UserUpdateModel={_id:"",education_class:0,email:"",name:"",password:"",profile_picture_url:"",username:""};
  updatePasswordModel:UpdatePasswordModel;
  downloadURL!: Observable<string>;
  control:boolean=true;
  fb:any;
  loginModel:LoginModel={email:"",password:""};
  load:boolean=false;

  constructor(private localStorageService:LocalStorageService,
    private targetUniversityService:TargetUniversityService,
    private formBuilder:FormBuilder,
    private toastrService: ToastrService,
    private router:Router,
    private authService:AuthService,
    private storage:AngularFireStorage,
    private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.user =this.localStorageService.getCurrentUser();
    this.getTarget(this.user._id);
    this.target._id=this.user._id;
    
    if(this.user.profile_picture_url.trim()===""){
      this.user.profile_picture_url="https://firebasestorage.googleapis.com/v0/b/ykskocu-a2caf.appspot.com/o/f5608f87-5a68-4eca-8624-7cdfaed23a2d?alt=media&token=a0b39b77-b820-44a5-8922-3117c7b7c01b";
    }
    this.createUserUpdateForm();
    this.createUpdatePasswordForm();
  
  }

  createUpdatePasswordForm(){
    this.updatePasswordForm=this.formBuilder.group({
      oldPassword:new FormControl('',[ Validators.minLength(6),Validators.required]),
      newPassword:new FormControl('',[ Validators.minLength(6),Validators.required]),
      verifyNewPassword:new FormControl('',[ Validators.minLength(6),Validators.required])
    })
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  createTarget(){
    if(this.targetUpdateForm.valid){
      let targetModel = Object.assign({}, this.targetUpdateForm.value);
     
      this.targetUniversityService.addTargetUniversity(targetModel).subscribe(response=>{
        this.toastrService.success("Hedefleriniz Oluşturuldu","Başarılı");
        this.router.navigate(["/user/profile"]);

      },
      responseError=>{
        this.toastrService.error("Sistemsel Bir Hata Oluştu Lütfen Daha Sonra Tekrar Deneyiniz.","Hata")
      })
    }
    else{  
      this.toastrService.warning("Tüm alanları doldurmalısınız!","Uyarı");
    }
  }
  getTarget(userId:string){
    this.targetUniversityService.getTargetUniversity(userId).subscribe(response=>{
      
        
        if(response==null){
          this.control=false;
          
        }
        else{
          this.target=response;
        }
        this.createTargetUpdateForm();
      
    });
  }

  createUserUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
    _id:[this.user._id,Validators.required],
    username:[this.user.username,Validators.required],
    password:new FormControl('',[ Validators.minLength(6),Validators.required]),
    name:[this.user.name,Validators.required],
    email:[this.user.email,Validators.required],
    profile_picture_url:[this.user.profile_picture_url,Validators.required],
    education_class:[this.user.class,Validators.required],
    })
  }

  createTargetUpdateForm(){
    this.targetUpdateForm=this.formBuilder.group({
      _id:[this.target._id,Validators.required],
      section:[this.target.section,Validators.required],
      target_department:[this.target.target_department,Validators.required],
      target_point:[this.target.target_point,Validators.required],
      target_university:[this.target.target_university,Validators.required]
    }
      
    )
  }  

  updatePassword(){
    if(this.updatePasswordForm.valid){

      this.updatePasswordModel=Object.assign({},this.updatePasswordForm.value);

      if(this.checkPassword(this.updatePasswordModel.oldPassword) && this.passwordsControl(this.updatePasswordModel))
      {
        this.setUpdateModel();
        
        this.authService.update(this.userUpdateModel).subscribe(response=>{
          this.toastrService.success("Parolanız güncellenmiştir. Lütfen tekrar giriş yapınız.","Başarılı.");
          this.router.navigate(["guest"]);
          this.localStorageService.removeUser();
        })
      }
     

    }
    else{
      this.toastrService.warning("Parola kurallara uygun değil. Lütfen tekrar deneyiniz!","Uyarı");
    }
  }
  setUpdateModel(){
    this.userUpdateModel._id=this.user._id;
    this.userUpdateModel.education_class=this.user.class;
    this.userUpdateModel.email=this.user.email;
    this.userUpdateModel.name=this.user.name;
    this.userUpdateModel.password=this.updatePasswordModel.newPassword;
    this.userUpdateModel.profile_picture_url=this.user.profile_picture_url;
    this.userUpdateModel.username=this.user.username;
  }
  passwordsControl(updatePasswordModel:UpdatePasswordModel):boolean{
    if(updatePasswordModel.newPassword==updatePasswordModel.verifyNewPassword){
      return true;
    }
    else{
      this.toastrService.warning("Yeni parolalar eşleşmiyor","Uyarı");
      return false;
    }
  }
  checkPassword(oldPassword:string):boolean{
    
    if(this.updatePasswordModel.oldPassword == this.user.password){
      
      return true;
    }
    else{
      this.toastrService.warning("Eski parola hatalı.","Uyarı");
      return false;
    }

  }

  getImg($event:any){
    this.selectedImg=$event?.target.files[0];
  }

  async update(){

    if(this.userUpdateForm.valid){
      this.load=true;
      this.userUpdateModel = Object.assign({}, this.userUpdateForm.value); 

      this.loginModel.email=this.userUpdateModel.username;
      this.loginModel.password=this.userUpdateModel.password;

      if(this.userUpdateModel.profile_picture_url !=''){ 
        this.uploadImgFireBase();
        await this.sleep(5000);
        
      }
      console.log(this.userUpdateModel)
      if(this.userUpdateModel.password == this.user.password){
        this.authService.update(this.userUpdateModel).subscribe(response=>{
          this.load=false;
          this.loginFromUpdate(this.loginModel);
          this.toastrService.success("Güncelleme işlemi başarıyla gerçekleşmiştir.","Başarılı.");
         
        },
        responseError=>{
          this.load=false;
          console.log(responseError)
        })
      }
      else{
        this.load=false;
        this.toastrService.warning("Parola Hatalı.")
      }
    
    }

    else{
      this.toastrService.show("Tüm alanları doldurmalısınız.")
    }

}
uploadImgFireBase(){
  let myuuid = uuidv4();

  const fileRef =this.storage.ref(myuuid);
  const task = this.storage.upload(myuuid, this.selectedImg);
  task
    .snapshotChanges()
    .pipe( 
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          this.selectedImg=this.fb;
          this.userUpdateModel.profile_picture_url=this.fb;
        
        });
      })
    )
    .subscribe(url => {
      if (url) {
       // console.log(url);
      }
    });
}
sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

loginFromUpdate(loginModel:LoginModel){
  this.authService.login(loginModel).subscribe(response=>{
    this.localStorageService.setCurrentUser(response);
    this.router.navigate(["user"])
    
  },
  responseError=>{
    this.toastrService.error("Bir hata oluştu");
  })
}

  updateTarget(){
    if(this.targetUpdateForm.valid){
      let targetModel = Object.assign({}, this.targetUpdateForm.value);
      this.targetUniversityService.updateTargetUniversity(targetModel).subscribe(response=>{
        this.toastrService.success("Hedefleriniz Güncellendi","Başarılı");
        this.router.navigate(["/user/profile"]);

      },
      responseError=>{
        this.toastrService.error("Sistemsel Bir Hata Oluştu Lütfen Daha Sonra Tekrar Deneyiniz.","Hata")
      })
    }
    else{  
      this.toastrService.warning("Tüm alanları doldurmalısınız!","Uyarı");
    }
  }

}
