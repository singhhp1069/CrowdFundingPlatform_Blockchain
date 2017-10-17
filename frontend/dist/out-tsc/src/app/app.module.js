"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_router_1 = require("./app.router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var deploycontract_component_1 = require("./deploycontract/deploycontract.component");
var project_contract_component_1 = require("./project-contract/project-contract.component");
var backer_contract_component_1 = require("./backer-contract/backer-contract.component");
var login_component_1 = require("./login/login.component");
var restapi_service_1 = require("./restapi.service");
var createproject_component_1 = require("./createproject/createproject.component");
var deleteproject_component_1 = require("./deleteproject/deleteproject.component");
var widrawproject_component_1 = require("./widrawproject/widrawproject.component");
var invest_backer_component_1 = require("./invest-backer/invest-backer.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            deploycontract_component_1.DeploycontractComponent,
            project_contract_component_1.ProjectContractComponent,
            backer_contract_component_1.BackerContractComponent,
            login_component_1.LoginComponent,
            createproject_component_1.CreateprojectComponent,
            deleteproject_component_1.DeleteprojectComponent,
            widrawproject_component_1.WidrawprojectComponent,
            invest_backer_component_1.InvestBackerComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_router_1.routes,
            http_1.HttpModule,
            forms_1.FormsModule
        ],
        providers: [restapi_service_1.RestapiService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map