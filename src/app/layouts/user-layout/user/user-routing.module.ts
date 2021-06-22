import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { CalculateScoreComponent } from 'src/app/pages/calculate-score/calculate-score.component';
import { FollowTopicComponent } from 'src/app/pages/follow-topic/follow-topic.component';
import { MyplanComponent } from 'src/app/pages/myplan/myplan.component';
import { SettingComponent } from 'src/app/pages/setting/setting.component';
import { StatisticsComponent } from 'src/app/pages/statistics/statistics.component';
import { TechniquesComponent } from 'src/app/pages/techniques/techniques.component';
import { TopicsComponent } from 'src/app/pages/topics/topics.component';

import { UniverstiyComponent } from 'src/app/pages/universtiy/universtiy.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { WorkingComponent } from 'src/app/pages/working/working.component';
import { AboutComponent } from '../../../pages/about/about.component';

export const routes: Routes = [
  {
    path:'',
    component:UserProfileComponent
  },
  {
    path:'profile',
    component:UserProfileComponent
  },
  {
    path:'statistics',
    component:StatisticsComponent
  },
  {
    path:'calculate',
    component:CalculateScoreComponent
  },
  {
    path:'universities',
    component:UniverstiyComponent
  },
  {
    path:'techniques',
    component:TechniquesComponent
  },
  {
    path:'topics',
    component:FollowTopicComponent
  },
  {
    path:'create',
    component:WorkingComponent
  },
  {
    path:'settings',
    component:SettingComponent
  },
  {
    path:"myplan",
    component:MyplanComponent
  }
];

