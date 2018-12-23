import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ServicesModule } from './services/services.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AuthenticationComponent } from './pages/authentication/authentication.component';
// import { ChatListComponent } from './pages/home/chat-list/chat-list.component';
// import { ConversationComponent } from './pages/home/conversation/conversation.component';
// import { HomeComponent } from './pages/home/home.component';
// import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    // AuthenticationComponent,
    // ChatListComponent,
    // ConversationComponent,
    // HomeComponent,
    // PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
