import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ActivityComponent } from './activity/activity.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailcollectionComponent } from './detailcollection/detailcollection.component';
import { FormcollectionComponent } from './formcollection/formcollection.component';
import { DetailpostComponent } from './detailpost/detailpost.component';
import { PostComponent } from './post/post.component';
import { SearchComponent } from './search/search.component';
import { FormpostComponent } from './formpost/formpost.component';
import { FormprofileComponent } from './formprofile/formprofile.component';
import { EditpostComponent } from './editpost/editpost.component';
import { CollectionpickerComponent } from './collectionpicker/collectionpicker.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';

import { Camera } from '@ionic-native/camera/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PostService } from './post.service';

//Pembuatan routes
const appRoutes: Routes = [
  { path: 'home', component: PostComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'detailpost/:idpost', component: DetailpostComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'detailfollow/:type', component: DetailpostComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'collection', component: CollectionComponent },
  {
    path: 'detailcollection/:idcollection',
    component: DetailcollectionComponent,
  },
  {
    path: 'formpost',
    component: FormpostComponent,
  },
  {
    path: 'edit/:username',
    component: FormprofileComponent,
  },
  {
    path: 'editpost/:id',
    component: EditpostComponent,
  },
  {
    path: 'formcollection',
    component: FormcollectionComponent,
  },
  {
    path: 'collectionpicker/:id',
    component: CollectionpickerComponent,
  },
  {
    path: 'formprofile/:username',
    component: FormprofileComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    DetailpostComponent,
    SearchComponent,
    ProfileComponent,
    ActivityComponent,
    CollectionComponent,
    DetailcollectionComponent,
    FormpostComponent,
    FormprofileComponent,
    EditpostComponent,
    FormcollectionComponent,
    CollectionpickerComponent,
    FormprofileComponent,
  ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    PostService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
