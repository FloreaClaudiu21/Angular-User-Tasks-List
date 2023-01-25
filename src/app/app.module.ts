import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NgxLoadingModule } from 'ngx-loading';
import { MainComponent } from './main/main.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from 'src/services/user-service.service';
import { LoggedComponent } from './logged/logged.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TasksService } from 'src/services/tasks.service';
import { TaskComponent } from './logged/task/task.component';
import { NavComponent } from './logged/nav/nav/nav.component';

@NgModule({
  declarations: [AppComponent, MainComponent, LoginComponent, LoggedComponent, TaskComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    NgxLoadingModule.forRoot({}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    UserService,
    TasksService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
