import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guards/guest.guard';
import { LoginGuard } from './guards/login.guard';

import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';


const routes: Routes = [
  {
    path:'',
    component:GuestLayoutComponent,canActivate:[GuestGuard],
    children:[
      {
        path:'',
        redirectTo:'/guest',
        pathMatch:'full'
      },

    {
        path:'guest',
        loadChildren : ()=>import('./layouts/guest-layout/guest/guest.module').then(m => m.GuestModule)
      }
    ]
  },
  {
    path:'',
    component:UserLayoutComponent,canActivate:[LoginGuard],
    children:[
      {
        path:'',
        redirectTo:'/user',
        pathMatch:'full'
      },
      {
        path:'user',
        loadChildren:()=>import('./layouts/user-layout/user/user.module').then(m=>m.UserModule)
      }
    ]

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
