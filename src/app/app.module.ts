import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatashareService } from './datashare.service';
import { AppComponent } from './app.component';
import { SelectgadgetsComponent } from './selectgadgets/selectgadgets.component';
import { ResultComponent } from './result/result.component';
import { approutes } from './routes';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    SelectgadgetsComponent,
    ResultComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    RadioButtonModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [DatashareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
