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
var ProjectContractComponent = (function () {
    function ProjectContractComponent(route, restservice, router) {
        this.route = route;
        this.restservice = restservice;
        this.router = router;
        this.address = '';
        this.project_info = '';
        this.project_title = '';
        this.funding_goal = 0;
        this.token = 0;
        this.project_end_date = '';
        this.project_end_time = '';
        this.isLoading = true;
        this.momentValue = '';
        this.isLoading = true;
    }
    ProjectContractComponent.prototype.ngOnInit = function () {
        this.address = this.route.snapshot.params['address'];
        if (this.address == "" || typeof this.address == 'undefined') {
            this.router.navigate(["/login"], { relativeTo: this.route });
        }
        else {
            this.project_owner_details(this.address);
        }
    };
    ProjectContractComponent.prototype.project_owner_details = function (address) {
        var _this = this;
        this.isLoading = true;
        console.log("project_owner_details called" + address);
        this.restservice.get_project_owner_details(address).subscribe(function (res) {
            _this.project_info = res.json();
            // console.log("Result Project "+JSON.stringify(res.json()));
            _this.isLoading = false;
        }, function (err) {
            console.log("falied project_owner_details");
        });
    };
    return ProjectContractComponent;
}());
ProjectContractComponent = __decorate([
    core_1.Component({
        selector: 'app-project-contract',
        templateUrl: './project-contract.component.html',
        styleUrls: ['./project-contract.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, restapi_service_1.RestapiService, router_1.Router])
], ProjectContractComponent);
exports.ProjectContractComponent = ProjectContractComponent;
//# sourceMappingURL=project-contract.component.js.map