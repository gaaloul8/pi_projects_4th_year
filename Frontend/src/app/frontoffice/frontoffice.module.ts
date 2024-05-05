import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeComponent } from './frontoffice.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import {DropdownUserComponent} from "../components/dropdown-user/dropdown-user.component";
import { PostFrontComponent } from '../components/post-front/post-front.component';


@NgModule({
  declarations: [
    FrontofficeComponent,HeaderComponent,FooterComponent
  ],
    imports: [
        CommonModule,
        FrontofficeRoutingModule,
        DropdownUserComponent
    ]
})
export class FrontofficeModule { }
