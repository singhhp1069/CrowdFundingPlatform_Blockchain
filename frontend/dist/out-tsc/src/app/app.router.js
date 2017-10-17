"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var deploycontract_component_1 = require("./deploycontract/deploycontract.component");
var backer_contract_component_1 = require("./backer-contract/backer-contract.component");
var project_contract_component_1 = require("./project-contract/project-contract.component");
var login_component_1 = require("./login/login.component");
var createproject_component_1 = require("./createproject/createproject.component");
var deleteproject_component_1 = require("./deleteproject/deleteproject.component");
var widrawproject_component_1 = require("./widrawproject/widrawproject.component");
var invest_backer_component_1 = require("./invest-backer/invest-backer.component");
exports.router = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'deploycontract', component: deploycontract_component_1.DeploycontractComponent },
    { path: 'backerview', component: backer_contract_component_1.BackerContractComponent },
    { path: 'projectview', component: project_contract_component_1.ProjectContractComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'createnewproject', component: createproject_component_1.CreateprojectComponent },
    { path: 'deleteproject', component: deleteproject_component_1.DeleteprojectComponent },
    { path: 'widrawproject', component: widrawproject_component_1.WidrawprojectComponent },
    { path: 'investproject', component: invest_backer_component_1.InvestBackerComponent }
];
exports.routes = router_1.RouterModule.forRoot(exports.router);
//# sourceMappingURL=app.router.js.map