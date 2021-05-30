import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DerslerModel } from 'src/app/model/derslerModel';
import { DersModel } from 'src/app/model/dersModel';

import { UpdateLessonModel } from 'src/app/model/updateLessonModel';
import { UserLoginResponseModel } from 'src/app/model/userLoginResponseModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TopicsService } from 'src/app/services/topics.service';



@Component({
  selector: 'app-follow-topic',
  templateUrl: './follow-topic.component.html',
  styleUrls: ['./follow-topic.component.css']
})
export class FollowTopicComponent implements OnInit {
 
  
  user:UserLoginResponseModel={_id:"",class:1,email:"",gender:"",name:"",password:"",profile_picture_url:"",username:""};
  topics:DerslerModel={_id:"",ayt:[],tyt:[]};
  dataLoaded:boolean=false;
  select:boolean[]=[];
  visible:boolean=false;
  selectedId:number=0;
  updateLesson:UpdateLessonModel={_id:"",lesson_name:"",type:"tyt",subject_state:""};
  section:boolean=false;
  subOfLastZeroTab:number=0;
  subOfLastOneTab:number=0;
  trigerZero:boolean=true;
  trigerOne:boolean=false;


  constructor(private topicsService:TopicsService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private roater:Router) { }

  ngOnInit(): void {
    this.user=this.localStorageService.getCurrentUser();
     
    this.getTopics(this.user._id,0)
  }

  save(dersModel:DersModel[]){
    this.visible=false;
    this.updateLesson._id=this.user._id;
   
    this.updateLesson.lesson_name= dersModel[this.selectedId].lesson_name;
    
    this.setSubjectsStatu(dersModel);
    console.log(this.section)
    if(this.section){
      this.updateLesson.type="ayt";
    }
    else{
      this.updateLesson.type="tyt";
    }
    console.log(this.updateLesson)
    this.topicsService.setTopic(this.updateLesson).subscribe(response=>{
      this.toastrService.success("İlerlemeniz kayıt edilmiştir",this.updateLesson.lesson_name);
      this.getTopics(this.user._id,this.selectedId)
    },
    responseError=>{
      this.toastrService.error("Sistemsel bir hata oluştu lütfen daha sonra tekrar deneyiniz..")
    })
   
  }

  setSubjectsStatu(dersModel:DersModel[]){
    let status="";
    for(let i =0;i<dersModel[this.selectedId].subjects.length;i++){
      if(this.select[i]){
        status+="1";
      }
      else{
        status+="0";
      }
    }
    this.updateLesson.subject_state=status;
  }

  getSelected(id:number,dersModel:DersModel[]){
    let checkList=dersModel[id].subject_state;
    for(let i = 0 ; i<checkList.length;i++){
      if(checkList[i]=="1"){
        this.select[i]=true
      }
      else{
        this.select[i]=false
      }
    }
  }
  async myTabFocusChange(changeEvent: MatTabChangeEvent) {
    this.visible=false;
    if(this.trigerZero){
      this.subOfLastZeroTab=changeEvent.index
    }
    if(this.trigerOne){
      this.subOfLastOneTab=changeEvent.index
    }
    await this.sleep(1000);
    this.selectedId=changeEvent.index;
    if(this.section){
      this.getSelected(changeEvent.index,this.topics.ayt)  
    }
    else{
      this.getSelected(changeEvent.index,this.topics.tyt)  
    }
   
 } 
  sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  getTopics(id:string,tabId:number){
    this.topicsService.getTopics(id).subscribe(response=>{
      this.topics=response;
      console.log(this.topics)
      this.dataLoaded=true;
      if(this.section){
        this.getSelected(tabId,this.topics.ayt)
      }else{
        this.getSelected(tabId,this.topics.tyt)
      }
      
     
    })
  }

  setVisible(){
    this.visible=true;
  }

 async focus(changeEvent: MatTabChangeEvent){
    
  

    if(changeEvent.index===1){
     
      this.section=true
      this.trigerZero=false
      this.trigerOne=true
      this.getSelected(this.subOfLastOneTab,this.topics.ayt)
    }
    else{
      this.section=false
      this.trigerZero=true
      this.trigerOne=false
      this.getSelected(this.subOfLastZeroTab,this.topics.tyt)
    }
   // this.section=section;
  }

}
