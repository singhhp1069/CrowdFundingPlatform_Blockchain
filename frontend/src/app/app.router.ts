import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DeploycontractComponent } from './deploycontract/deploycontract.component';
import { BackerContractComponent } from './backer-contract/backer-contract.component';
import { ProjectContractComponent } from './project-contract/project-contract.component';
import { LoginComponent } from './login/login.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { DeleteprojectComponent } from './deleteproject/deleteproject.component';
import { WidrawprojectComponent } from './widrawproject/widrawproject.component';
import { InvestBackerComponent } from './invest-backer/invest-backer.component';



export const router: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'deploycontract', component: DeploycontractComponent },
    { path: 'backerview', component: BackerContractComponent },
    { path: 'projectview', component: ProjectContractComponent },
    { path: 'login', component: LoginComponent},
    { path: 'createnewproject' , component: CreateprojectComponent },
    { path: 'deleteproject' , component: DeleteprojectComponent },
    { path: 'widrawproject' , component: WidrawprojectComponent },
    { path: 'investproject' , component: InvestBackerComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
