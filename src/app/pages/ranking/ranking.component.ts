import { RankServiceService } from './../../services/rank-service.service';
import { RankModel } from './../../model/rankModel';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  ranks:RankModel[]=[];

  constructor(private rankService:RankServiceService) { }

  ngOnInit(): void {
    this.getRank();
   
  }

  getRank(){
    this.rankService.getRank().subscribe(response=>{
      this.ranks=response;
      console.log(this.ranks)
    })
  }

}
