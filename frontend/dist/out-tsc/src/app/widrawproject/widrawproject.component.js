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
var WidrawprojectComponent = (function () {
    function WidrawprojectComponent(route, restservice, router) {
        this.route = route;
        this.restservice = restservice;
        this.router = router;
        this.project_address = '';
        this.account_address = '';
        this.result = '';
        this.isLoading = true;
        this.isLoading = true;
    }
    WidrawprojectComponent.prototype.ngOnInit = function () {
        this.account_address = this.route.snapshot.params['accountid'];
        this.project_address = this.route.snapshot.params['project_address'];
        if (this.account_address == "" || typeof this.account_address == 'undefined' ||
            this.project_address == "" || typeof this.project_address == 'undefined') {
            this.router.navigate(["/login"], { relativeTo: this.route });
        }
        else {
            this.widraw_project(this.account_address, this.project_address);
        }
    };
    WidrawprojectComponent.prototype.widraw_project = function (address, project_address) {
        var _this = this;
        this.isLoading = true;
        this.restservice.widraw_funding(address, project_address).subscribe(function (res) {
            console.log("success widraw_funding" + JSON.stringify(res.json()));
            _this.result = res.json();
            _this.isLoading = false;
        }, function (err) {
            console.log("falied widraw_funding");
        });
    };
    return WidrawprojectComponent;
}());
WidrawprojectComponent = __decorate([
    core_1.Component({
        selector: 'app-widrawproject',
        templateUrl: './widrawproject.component.html',
        styleUrls: ['./widrawproject.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, restapi_service_1.RestapiService, router_1.Router])
], WidrawprojectComponent);
exports.WidrawprojectComponent = WidrawprojectComponent;
//# sourceMappingURL=widrawproject.component.js.map