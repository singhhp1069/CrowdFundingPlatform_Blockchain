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
var restapi_service_1 = require("../restapi.service");
var LoginComponent = (function () {
    function LoginComponent(restservice) {
        this.restservice = restservice;
        this.account_ids = '';
        this.accountid = '';
        this.contract_details = '';
        this.isLoading = true;
        this.isGetInfo = false;
        this.isAddress = true;
        this.isLoading = true;
        this.isGetInfo = false;
        this.isAddress = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.getContracts();
    };
    LoginComponent.prototype.getContracts = function () {
        var _this = this;
        this.isLoading = true;
        this.restservice.get_contracts().subscribe(function (res) {
            console.log("success");
            _this.account_ids = res.json();
            _this.isLoading = false;
        }, function (err) {
            console.log("falied");
        });
    };
    LoginComponent.prototype.getContractDetails = function (account) {
        var _this = this;
        if (account != '') {
            this.isAddress = true;
            this.isLoading = true;
            this.restservice.get_contract_details(account).subscribe(function (res) {
                (function (res) { return res.json(); });
                _this.contract_details = res.json();
                console.log("success" + JSON.stringify(res.json()));
                _this.isGetInfo = true;
                _this.isLoading = false;
            }, function (err) {
                console.log("error");
            });
        }
        else {
            console.log("no");
            this.isAddress = false;
        }
    };
    LoginComponent.prototype.onclick = function (account_id) {
        console.log("Accountid is :" + account_id);
        this.accountid = account_id;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        inputs: ['account_ids'],
    }),
    __metadata("design:paramtypes", [restapi_service_1.RestapiService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map