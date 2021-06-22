import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormBuilder,
  FormControl,
  Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { WorkoutModel } from 'src/app/model/workoutModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TopicsService } from 'src/app/services/topics.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.css']
})
export class WorkingComponent implements OnInit {

user:UserLoginResponseModel;
workoutModel:WorkoutModel;
createWorkingForm:FormGroup;
no:number=5;

  
  constructor( private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService,
    private topicsService:TopicsService,
    private workoutService:WorkoutService,
    private router:Router) { }

  ngOnInit(): void {
    this.user=this.localStorageService.getCurrentUser();
    this.creeteWorking();
  
  }

  creeteWorking(){
    this.createWorkingForm=this.formBuilder.group({
      date:['',Validators.required],
      start_time:['',Validators.required],
      end_time:['',Validators.required],
      lesson_name:['',Validators.required],
      subject:['',Validators.required],
      info:[''],
      username:['']
    })
  }
 
  creteWorkout(){

    if(this.createWorkingForm.valid){
      this.workoutModel= Object.assign({}, this.createWorkingForm.value); 
      this.workoutModel.username=this.user.username;
      this.workoutModel.start_time=this.parseToMinute(this.workoutModel.start_time);
      this.workoutModel.end_time=this.parseToMinute(this.workoutModel.end_time);
      this.workoutService.addWorkout(this.workoutModel).subscribe(response=>{
        this.router.navigate(["user/myplan"])
        this.toastrService.success("Çalışma başarılı bir şekilde oluşturulmuştur.","Başarılı")
        
      },responseError=>{
       
        this.toastrService.error("Sistemsel bir hata oluştu lütfen daha sonra tekrar deneyiniz."
        ,"Hata")
      })
      
    }
    else{
      this.toastrService.error("Tüm alanları doldurmanız gerekmektedir.","Hata")
    }
  }

  parseToMinute(time:number):number{
    let convert = "";
    convert+=time;
    let timeParameter =convert.split(":");
    return parseInt(timeParameter[0])*60+parseInt(timeParameter[1]);
  }
 

 
}
