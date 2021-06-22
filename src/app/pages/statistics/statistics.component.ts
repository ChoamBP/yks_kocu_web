import { Component, OnInit } from '@angular/core';
import { DerslerModel } from 'src/app/model/derslerModel';
import { DersModel } from 'src/app/model/dersModel';
import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  topics:DerslerModel={_id:"",ayt:[],tyt:[]};
  user:UserLoginResponseModel={_id:"",class:1,email:"",gender:"",name:"",password:"",profile_picture_url:"",username:""};
  aytTotal:number=0;
  tytTotal:number=0;
 

  constructor(private topicsService:TopicsService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.user=this.localStorageService.getCurrentUser();
    this.getTopics(this.user._id)

   
    
  }
  getAytTotal(){
    return "stroke-dashoffset: calc(945px - (945px *"+this.aytTotal+" ) / 100);"
  }

  getTytTotal(){
    return "stroke-dashoffset: calc(945px - (945px *"+this.tytTotal+" ) / 100);"
  }

  calculateGeneralPercent(lesons:DersModel[],focus:boolean){
    let totalComplete=0;
    let totalSubject=0;
    lesons.forEach(subject => {
      totalComplete += this.calculatePercent(subject.subject_state)/100*(subject.subject_state.length);
      totalSubject+=(subject.subject_state.length);
    });
    
   if(focus){
    this.tytTotal=Number((totalComplete/totalSubject*100).toFixed(2));
    
   }
   else{
     this.aytTotal=Number((totalComplete/totalSubject*100).toFixed(2));
     
   }

  }

  calculatePercent(subjectStatus:string){
    let complete=0;

    for(let i =0;i<subjectStatus.length;i++){
      if(subjectStatus[i]=="1"){
        complete++;
      }

    }
    console.log(subjectStatus.length)
    return Number(((complete/(subjectStatus.length))*100).toFixed(2));
  }



  getStyle(subjectStatus:string){
   
    if(this.calculatePercent(subjectStatus)<10){
      return "width:"+ this.calculatePercent(subjectStatus)+"%; color:black;";
    }
    else{
      return "width:"+ this.calculatePercent(subjectStatus)+"%;";
    }
    
  }
  getTopics(id:string){
    this.topicsService.getTopics(id).subscribe(response=>{
      this.topics=response;

      this.calculateGeneralPercent(this.topics.ayt,false);//bool 0 =ayt
      this.calculateGeneralPercent(this.topics.tyt,true);// bool 1 =tyt
      
    })
  }

}
