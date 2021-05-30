import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTabsModule } from '@angular/material/tabs'
import { RouterModule } from '@angular/router';
import { routes } from './user-routing.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    RouterModule.forChild(routes),
    MatTabsModule
  ]
})
export class UserModule { }
