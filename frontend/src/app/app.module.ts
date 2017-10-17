import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DeploycontractComponent } from './deploycontract/deploycontract.component';
import { ProjectContractComponent } from './project-contract/project-contract.component';
import { BackerContractComponent } from './backer-contract/backer-contract.component';
import { LoginComponent } from './login/login.component';
import {RestapiService} from './restapi.service';
import { CreateprojectComponent } from './createproject/createproject.component';
import { DeleteprojectComponent } from './deleteproject/deleteproject.component';
import { WidrawprojectComponent } from './widrawproject/widrawproject.component';
import { InvestBackerComponent } from './invest-backer/invest-backer.component';

@NgModule({
  declarations: [
    AppComponent,
    DeploycontractComponent,
    ProjectContractComponent,
    BackerContractComponent,
    LoginComponent,
    CreateprojectComponent,
    DeleteprojectComponent,
    WidrawprojectComponent,
    InvestBackerComponent
  ],
  imports: [
    BrowserModule,
     routes,
     HttpModule,
     FormsModule
  ],
  providers: [RestapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
