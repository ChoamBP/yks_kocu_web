import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.css']
})
export class WorkingComponent implements OnInit {

  no:number=11;
  constructor() { }

  ngOnInit(): void {
  }

  get(){
    return "stroke-dashoffset: calc(945px - (945px *"+this.no+" ) / 100);"
  }

}
