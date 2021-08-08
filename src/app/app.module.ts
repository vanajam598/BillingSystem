import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBillsComponent } from './my-bills/my-bills.component';
import { ItemsComponent } from './items/items.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { SalesComponent } from './sales/sales.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    MyBillsComponent,
    ItemsComponent,
    NewBillComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
