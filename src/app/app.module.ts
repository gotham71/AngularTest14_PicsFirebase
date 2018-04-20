import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTING } from './app.routes';

// Services
import { LoadPicsService } from './services/load-pics.service';

// Directives
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Components
import { AppComponent } from './app.component';
import { PicsComponent } from './components/pics/pics.component';
import { UploadComponent } from './components/upload/upload.component';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    PicsComponent,
    UploadComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    APP_ROUTING
  ],
  providers: [
    LoadPicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
