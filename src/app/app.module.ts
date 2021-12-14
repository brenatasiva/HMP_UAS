import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivityComponent } from './activity/activity.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailcollectionComponent } from './detailcollection/detailcollection.component';
import { DetailpostComponent } from './detailpost/detailpost.component';
import { PostComponent } from './post/post.component';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {IonicStorageModule} from '@ionic/storage-angular';

import { Camera } from '@ionic-native/camera/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PostService } from './post.service';


//Pembuatan routes
const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'post', component: PostComponent },
  { path: 'detailpost/:idpost', component: DetailpostComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'detailfollow/:type/:username', component: DetailpostComponent },
  { path: 'activity/:username', component: ActivityComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'detailcollection/:idcollection', component: DetailcollectionComponent },
];

@NgModule({
  declarations: [AppComponent, SignupComponent, PostComponent,
                DetailpostComponent, SearchComponent, ProfileComponent,
                ActivityComponent, CollectionComponent, DetailcollectionComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), RouterModule.forRoot(appRoutes),  AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production,
    // Register the ServiceWorker as soon as the app is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              Camera, PostService],
  bootstrap: [AppComponent],
})
export class AppModule { }
