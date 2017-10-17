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
var common_1 = require("@angular/common");
var CreateprojectComponent = (function () {
    function CreateprojectComponent(route, restservice, router, location) {
        this.route = route;
        this.restservice = restservice;
        this.router = router;
        this.location = location;
        this.address = '';
        this.project_title = '';
        this.funding_goal = '';
        this.token = '';
        this.project_end_date = '';
        this.project_end_time = '';
        this.project_creation_response = '';
        this.project_ends = '';
        this.isLoading = true;
        this.isLoading = true;
    }
    CreateprojectComponent.prototype.ngOnInit = function () {
        this.address = this.route.snapshot.params['accountid'];
        this.project_title = this.route.snapshot.params['project_title'];
        this.funding_goal = this.route.snapshot.params['funding_goal'];
        this.token = this.route.snapshot.params['token'];
        this.project_end_date = this.route.snapshot.params['project_end_date'];
        this.project_end_time = this.route.snapshot.params['project_end_time'];
        this.project_ends = this.project_end_date + "T" + this.project_end_time;
        if (this.address == "" || typeof this.address == 'undefined' ||
            this.project_title == "" || typeof this.project_title == 'undefined' ||
            this.funding_goal == "" || typeof this.funding_goal == 'undefined' ||
            this.token == "" || typeof this.token == 'undefined' ||
            this.project_end_date == "" || typeof this.project_end_date == 'undefined' ||
            this.project_end_time == "" || typeof this.project_end_time == 'undefined') {
            this.router.navigate(["/login"], { relativeTo: this.route });
        }
        else {
            this.create_project(this.address, this.project_title, this.funding_goal, this.token, this.project_ends);
        }
    };
    CreateprojectComponent.prototype.create_project = function (address, _title, _funding_goal, _tokens, _project_end_date) {
        var _this = this;
        this.isLoading = true;
        this.restservice.post_project_as_owner(address, _title, _funding_goal, _tokens, _project_end_date).subscribe(function (res) {
            (function (res) { return res.json(); });
            _this.project_creation_response = res.json();
            _this.isLoading = false;
        }, function (err) {
            console.log("falied project_owner_details");
        });
    };
    CreateprojectComponent.prototype.goBack = function () {
        this.location.back(); // <-- go back to previous location on cancel
    };
    return CreateprojectComponent;
}());
CreateprojectComponent = __decorate([
    core_1.Component({
        selector: 'app-createproject',
        templateUrl: './createproject.component.html',
        styleUrls: ['./createproject.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, restapi_service_1.RestapiService, router_1.Router, common_1.Location])
], CreateprojectComponent);
exports.CreateprojectComponent = CreateprojectComponent;
//# sourceMappingURL=createproject.component.js.map