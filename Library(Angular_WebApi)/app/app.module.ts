import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
//AddComponents
import { UserComponent } from './components/user.component';
import { HomeComponent } from './components/home.component';
import { BookComponent } from './components/book.component';
//AddServices
import { UserService } from './Service/user.service';
import { BookService } from './Service/book.service';



@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, UserComponent, HomeComponent, BookComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService, BookService],
    bootstrap: [AppComponent]
})

export class AppModule { }