import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import {  routes } from './guest-routing.module';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs'




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(routes),
    MatTabsModule
   
    
  ]
})
export class GuestModule { }
