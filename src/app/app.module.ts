import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';

// Image compression
import { NgxImageCompressService } from 'ngx-image-compress';

// Language service
import { LanguageService } from './services/language.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NgxImageCompressService,
    // Initialize language service
    {
      provide: APP_INITIALIZER,
      useFactory: (languageService: LanguageService) => {
        return () => {
          // Initialize language service
          return languageService.initLanguage();
        };
      },
      deps: [LanguageService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
