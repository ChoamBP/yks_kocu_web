import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { CalculateScoreComponent } from 'src/app/pages/calculate-score/calculate-score.component';
import { TechniquesComponent } from 'src/app/pages/techniques/techniques.component';
import { TopicsComponent } from 'src/app/pages/topics/topics.component';
import { UniverstiyComponent } from 'src/app/pages/universtiy/universtiy.component';
import { RankingComponent } from '../../../pages/ranking/ranking.component';


export const routes: Routes = [
  {
    path: '',
    component: RankingComponent
  },
  {
    path: 'universities',
    component: UniverstiyComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'calcuate',
    component:CalculateScoreComponent
  },
  {
    path:'topics',
    component:TopicsComponent
  },
  {
    path:'techniques',
    component:TechniquesComponent
  }
];
