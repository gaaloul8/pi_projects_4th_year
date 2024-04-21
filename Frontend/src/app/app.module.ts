import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClubsComponent } from './components/clubs/clubs.component';
import { TableModule } from 'primeng/table'; 
import { ToolbarModule } from 'primeng/toolbar'; 
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; 
import { InputTextModule } from 'primeng/inputtext'; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber'; 
import { PostComponent } from './components/post/post.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, ClubsComponent,PostComponent],
    imports: [AppRoutingModule, AppLayoutModule, ReactiveFormsModule, FormsModule, BrowserModule,CommonModule,TableModule,ToolbarModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
