import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UiComponent } from "./ui/ui.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { HandtrackerComponent } from "./handtracker/handtracker.component";
import { FontCardComponent } from "./components/font-card/font-card.component";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FavCardComponent } from './components/fav-card/fav-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    HomePageComponent,
    HandtrackerComponent,
    FontCardComponent,
    FavCardComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
