import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculate-score',
  templateUrl: './calculate-score.component.html',
  styleUrls: ['./calculate-score.component.css']
})
export class CalculateScoreComponent implements OnInit {
  

  score:number=0;
  correctForTurkish:number=0;
  falseForTurkish:number=0;

  correctForSocial:number=0;
  falseForSocial:number=0;
  
  correctForMat:number=0;
  falseForMat:number=0;
  
  correctForFen:number=0;
  falseForFen:number=0;
  
  correctForAytHis2:number=0;
  falseForAytHis2:number=0;
  
  correctForAytCog2:number=0;
  falseForAytCog2:number=0;
  
  correctForAytFel:number=0;
  falseForAytFel:number=0;
  
  correctForAytDin:number=0;
  falseForAytDin:number=0;
  
  correctForAytEde:number=0;
  falseForAytEde:number=0;
  
  correctForAytHis1:number=0;
  falseForAytHis1:number=0;
  
  correctForAytCog1:number=0;
  falseForAytCog1:number=0;
  
  correctForAytMat:number=0;
  falseForAytMat:number=0;
  
  correctForAytFiz:number=0;
  falseForAytFiz:number=0;
  
  correctForAytKim:number=0;
  falseForAytKim:number=0;
  
  correctForAytBio:number=0;
  falseForAytBio:number=0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
