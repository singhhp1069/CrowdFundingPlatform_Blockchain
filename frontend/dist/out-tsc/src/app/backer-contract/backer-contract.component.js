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
var BackerContractComponent = (function () {
    function BackerContractComponent(route, restservice, router) {
        this.route = route;
        this.restservice = restservice;
        this.router = router;
        this.address = '';
        this.backer_info = '';
        this.project_info = '';
        this.invest_amount = '';
        this.isLoading = true;
        this.isBackerLoading = true;
        this.isLoading = true;
        this.isBackerLoading = true;
    }
    BackerContractComponent.prototype.ngOnInit = function () {
        this.address = this.route.snapshot.params['address'];
        if (this.address == "" || typeof this.address == 'undefined') {
            this.router.navigate(["/login"], { relativeTo: this.route });
        }
        else {
            this.getProjects();
        }
    };
    BackerContractComponent.prototype.backers_details = function (address) {
        var _this = this;
        this.isBackerLoading = true;
        this.restservice.get_backers_details(address).subscribe(function (res) {
            _this.backer_info = res.json();
            _this.isBackerLoading = false;
        }, function (err) {
            console.log("falied backers_details");
        });
    };
    BackerContractComponent.prototype.getProjects = function () {
        var _this = this;
        this.isLoading = true;
        this.restservice.get_projects().subscribe(function (res) {
            _this.project_info = res.json();
            console.log("projects are :" + JSON.stringify(res.json()));
            _this.isLoading = false;
            _this.backers_details(_this.address);
        }, function (err) {
            console.log("falied backers_details");
        });
    };
    return BackerContractComponent;
}());
BackerContractComponent = __decorate([
    core_1.Component({
        selector: 'app-backer-contract',
        templateUrl: './backer-contract.component.html',
        styleUrls: ['./backer-contract.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, restapi_service_1.RestapiService, router_1.Router])
], BackerContractComponent);
exports.BackerContractComponent = BackerContractComponent;
//# sourceMappingURL=backer-contract.component.js.map