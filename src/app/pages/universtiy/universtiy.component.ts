import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';import { MatTabChangeEvent } from '@angular/material/tabs';

import { universities } from 'src/app/components/constants/universities';

import { UniversityModel } from 'src/app/model/universityModel';




@Component({
  selector: 'app-universtiy',
  templateUrl: './universtiy.component.html',
  styleUrls: ['./universtiy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniverstiyComponent implements OnInit {
  
  filterText:string="";
  university:UniversityModel[] = universities;
  constructor() { }

  ngOnInit(): void {
    
  }

}
