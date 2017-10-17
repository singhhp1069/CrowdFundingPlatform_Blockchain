"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var restapi_service_1 = require("../restapi.service");
var DeploycontractComponent = (function () {
    function DeploycontractComponent(route, restservice, router) {
        this.route = route;
        this.restservice = restservice;
        this.router = router;
        this.address = '';
        this.contract_details = '';
        //Layout String
        this.layout_info_project = '';
        this.layout_info_backer = '';
        this.layout_button_project = '';
        this.layout_button_backer = '';
    }
    DeploycontractComponent.prototype.ngOnInit = function () {
        this.address = this.route.snapshot.params['address'];
        if (this.address == "" || typeof this.address == 'undefined') {
            this.router.navigate(["/login"], { relativeTo: this.route });
        }
        else {
            this.getContractDetails(this.address);
        }
    };
    DeploycontractComponent.prototype.set_Layout = function () {
        if (this.contract_details.project_owner_address != null && this.contract_details.backer_address != null) {
            this.layout_info_project = "View As a Project Owner";
            this.layout_info_backer = "View As a Backer";
            this.layout_button_project = "View";
            this.layout_button_backer = "View";
        }
        else if (this.contract_details.project_owner_address) {
            this.layout_info_project = "View As a Project Owner";
            this.layout_info_backer = "Deploy Contract As a Backer";
            this.layout_button_project = "View";
            this.layout_button_backer = "Deploy";
        }
        else if (this.contract_details.backer_address) {
            this.layout_info_project = "Deploy Contract As a Project Owner";
            this.layout_info_backer = "Deploy As a Backer";
            this.layout_button_project = "Deploy";
            this.layout_button_backer = "View";
        }
        else {
            this.layout_info_project = "Deploy Contract As a Project Owner";
            this.layout_info_backer = "Deploy Contract As a Backer";
            this.layout_button_project = "Deploy";
            this.layout_button_backer = "Deploy";
        }
    };
    DeploycontractComponent.prototype.getContractDetails = function (account) {
        var _this = this;
        this.restservice.get_contract_details(account).subscribe(function (res) {
            (function (res) { return res.json(); });
            _this.contract_details = res.json();
            //Set a layout as per user information
            _this.set_Layout();
        }, function (err) {
            console.log("error");
        });
    };
    return DeploycontractComponent;
}());
DeploycontractComponent = __decorate([
    core_1.Component({
        selector: 'app-deploycontract',
        templateUrl: './deploycontract.component.html',
        styleUrls: ['./deploycontract.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, restapi_service_1.RestapiService, router_1.Router])
], DeploycontractComponent);
exports.DeploycontractComponent = DeploycontractComponent;
//# sourceMappingURL=deploycontract.component.js.map