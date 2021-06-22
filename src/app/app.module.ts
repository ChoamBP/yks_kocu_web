import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { AboutComponent } from './pages/about/about.component';


import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalculateScoreComponent } from './pages/calculate-score/calculate-score.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { TechniquesComponent } from './pages/techniques/techniques.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs'
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { FollowTopicComponent } from './pages/follow-topic/follow-topic.component';
import { MatProgressSpinnerModule } from'@angular/material/progress-spinner'
import {MatListModule} from '@angular/material/list';
import { WorkingComponent } from './pages/working/working.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';

import { ToastrModule } from 'ngx-toastr';
import { SettingComponent } from './pages/setting/setting.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { UniverstiyComponent } from './pages/universtiy/universtiy.component';
import { FilterUniPipe } from './pipes/filter-uni.pipe';
import { MyplanComponent } from './pages/myplan/myplan.component';
import { TimeConventerPipe } from './pipes/time-conventer.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RankingComponent,
    AboutComponent,
    GuestLayoutComponent,
    UserLayoutComponent,
    FooterComponent,
    CalculateScoreComponent,
    TopicsComponent,
    TechniquesComponent,
    SidebarComponent,
    UserProfileComponent,
    StatisticsComponent,
    FollowTopicComponent,
    WorkingComponent,
    SettingComponent,
    UniverstiyComponent,
    FilterUniPipe,
    MyplanComponent,
    TimeConventerPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,MatTabsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatStepperModule,
    ScrollingModule,
    MatTableModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ToastrModule.forRoot({
      positionClass:"toast-bottom-left"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
