import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {v4 as uuidv4} from 'uuid';
import { map, finalize } from "rxjs/operators";
import { UserRegisterModel } from 'src/app/model/userRegisterModel';
import { LoginModel } from 'src/app/model/loginModel';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!:FormGroup;
  selectedImg:string="";
  downloadURL!: Observable<string>;
  fb:any;
  registerModel!:UserRegisterModel;
  loginModel:LoginModel={email:"",password:""};
  registerControl:boolean=false;
  load:boolean=false;

  constructor( private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService, 
    private router:Router,
    private localStorageService:LocalStorageService,
    private storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: new FormControl('',[ Validators.minLength(6),Validators.required]) 
      
    });
  }

  getImg($event:any){
    this.selectedImg=$event?.target.files[0];
 
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      username:['',Validators.required],
      password:new FormControl('',[ Validators.minLength(6),Validators.required]) ,
      email:['',Validators.required],
      name:['',Validators.required],
      profile_picture_url:[''],
      gender:['',Validators.required],
      education_class:['',Validators.required]
    })
  }

  async register(){

      if(this.registerForm.valid){
        this.load=true;
        this.registerModel = Object.assign({}, this.registerForm.value); 
      
        this.loginModel.email=this.registerModel.username;
        this.loginModel.password=this.registerModel.password;
        
        if(this.registerModel.profile_picture_url !=''){ 
          this.uploadImgFireBase();
          await this.sleep(5000);
          
        }
        this.authService.register(this.registerModel).subscribe(response=>{
          this.loginFromReg(this.loginModel);
          this.load=false;
          this.toastrService.success("Kayıt işlemi başarıyla gerçekleşmiştir.","Başarılı.");
         
        },
        responseError=>{
          this.toastrService.error("Bu kullanıcı zaten mevcut ","Hata");
          this.load=false;
        })
       
      }

      else{
        this.toastrService.show("valid değil")
      }

  }

  sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loginFromReg(loginModel:LoginModel){
    this.authService.login(loginModel).subscribe(response=>{
      this.localStorageService.setCurrentUser(response);
   
      this.router.navigate(["user"])
      this.toastrService.success("Hoş Geldiniz");
    },
    responseError=>{
      this.toastrService.error("Bir hata oluştu");
    })
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
            this.registerModel.profile_picture_url=this.fb;
          
          });
        })
      )
      .subscribe(url => {
        if (url) {
         // console.log(url);
        }
      });
  }

  login(){
  

    if (this.loginForm.valid ) {
      this.load=true;
     let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info("başarılı")
     
       this.load=false;
        this.localStorageService.setCurrentUser(response);
        this.router.navigate(["user"])
       

      },responseError=>{
        this.load=false;
        this.toastrService.warning("Kullanıcı adı veya şifresi hatalı !! ")
      })
    
    }
    else{
      this.toastrService.error("Kullanıcı adı veya şifre eksik yada yanlış girilmiştir.")
    }
  //  this.router.navigate(["user"])
  }

}
