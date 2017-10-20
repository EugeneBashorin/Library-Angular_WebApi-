import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule/*, MatNativeDateModule*/ } from '@angular/material';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Added FormsModule to filter
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
//Add Kendo moduls
//import { ButtonModule } from '@progress/kendo-angular-buttons';
//import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
//import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';

//AddComponents
//import { UserComponent } from './components/user.component';
//import { HomeComponent } from './components/home.component';
import { BookComponent } from './components/book.component';
import { UserDtoComponent } from './components/userDTO.component';

//AddServices
//import { UserService } from './Service/user.service';
import { BookService } from './Service/book.service';
import { UserDtoService } from './Service/userDto.service';

//AddFilter(Pipe)
//import { UserFilterPipe } from './filter/user.pipe';
import { BookPublisherFilterPipe } from './filter/book.pipe';

//AddSearchComponent
import { SearchComponent } from './shared/search.component';
import { SearchPublisherComponent } from './shared/searchPublisher.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule],
    declarations: [AppComponent, BookPublisherFilterPipe, SearchPublisherComponent, BookComponent, UserDtoComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, BookService, UserDtoService],
    bootstrap: [AppComponent]
})

export class AppModule { }