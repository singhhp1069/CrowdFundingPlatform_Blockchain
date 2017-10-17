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
var InvestBackerComponent = (function () {
    function InvestBackerComponent(route, restservice, router) {
        this.route = route;
        this.restservice = restservice;
        this.router = router;
        this.isLoading = true;
        this.invest_amount = '';
        this.backer_address = '';
        this.project_address = '';
        this.invest_info = '';
        this.isLoading = true;
    }
    InvestBackerComponent.prototype.ngOnInit = function () {
        this.backer_address = this.route.snapshot.params['accountid'];
        this.project_address = this.route.snapshot.params['project_address'];
        this.invest_amount = this.route.snapshot.params['invest_amount'];
        if (this.backer_address == "" || typeof this.backer_address == 'undefined'
            || this.project_address == "" || typeof this.project_address == 'undefined'
            || this.invest_amount == "" || typeof this.invest_amount == 'undefined') {
            this.router.navigate(["/login"], { relativeTo: this.route });
        }
        else {
            this.invest_backer(this.backer_address, this.project_address, this.invest_amount);
        }
    };
    InvestBackerComponent.prototype.invest_backer = function (backer_address, project_address, invest_amount) {
        var _this = this;
        this.isLoading = true;
        this.restservice.fund_project_as_backer(backer_address, project_address, invest_amount).subscribe(function (res) {
            _this.invest_info = res.json();
            console.log("investment result " + JSON.stringify(_this.invest_info));
            _this.isLoading = false;
        }, function (err) {
            console.log("falied backers_details");
        });
    };
    return InvestBackerComponent;
}());
InvestBackerComponent = __decorate([
    core_1.Component({
        selector: 'app-invest-backer',
        templateUrl: './invest-backer.component.html',
        styleUrls: ['./invest-backer.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, restapi_service_1.RestapiService, router_1.Router])
], InvestBackerComponent);
exports.InvestBackerComponent = InvestBackerComponent;
//# sourceMappingURL=invest-backer.component.js.map