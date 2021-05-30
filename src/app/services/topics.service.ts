import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DerslerModel } from '../model/derslerModel';
import { UpdateLessonModel } from '../model/updateLessonModel';


@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  apiUrl="https://yksapp.herokuapp.com/api/lessons/"
  constructor(private httpClient:HttpClient) { }


  getTopics(id:string):Observable<DerslerModel>{
    let newUrl=this.apiUrl+"get_data/"+id;
    return this.httpClient.get<DerslerModel>(newUrl);

  }
  
  setTopic(updateLesson:UpdateLessonModel):Observable<boolean>{
    let newUrl=this.apiUrl+"update_one_lesson";
    return this.httpClient.post<boolean>(newUrl,updateLesson);
  }
}
