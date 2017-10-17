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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var RestapiService = (function () {
    function RestapiService(http) {
        this.http = http;
        this.API_URL = "http://localhost:8080";
    }
    /* GET API
    *********
    *********
    *******/
    // Returns json array about available accounts on testrpc.
    RestapiService.prototype.get_contracts = function () {
        return this.http.get(this._url);
    };
    // Returns json data about account (project_owner_address, backer_address).
    RestapiService.prototype.get_contract_details = function (accountid) {
        return this.http.get(this._url + accountid);
    };
    /* BAKERS API
    ***********
    **********
    *********/
    // Returns json data about a backer. and deploy contract as backer
    RestapiService.prototype.get_backers_details = function (accountid) {
        return this.http.get(this._url + 'backer/backer/' + accountid);
    };
    // Returns json data about successful funding.
    RestapiService.prototype.fund_project_as_backer = function (accountid, projectid, _funding) {
        var post_url = this._url + 'backer/' + accountid;
        var body = { project_address: projectid, funding: _funding };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(post_url, body, { headers: headers })
            .catch(this.error_handler);
    };
    /* PROJECT API
   ***********
   **********
   *********/
    // Returns json data about project owner. and deploy contract as project owner
    RestapiService.prototype.get_project_owner_details = function (accountid) {
        return this.http.get(this._url + 'project_owner/' + accountid);
    };
    // Returns json data about project owner.
    RestapiService.prototype.post_project_as_owner = function (accountid, _title, _funding_goal, _tokens, _project_end_date) {
        var post_url = this._url + 'project_owner/' + accountid;
        var body = { project_title: _title, project_funding_goal: _funding_goal, tokens: _tokens, project_end_date: _project_end_date };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(post_url, body, { headers: headers })
            .catch(this.error_handler);
    };
    // Returns json data about successful deletion of a project.
    RestapiService.prototype.delete_project = function (accountid, projectid) {
        var post_url = this._url + 'project_owner/' + accountid;
        var body = { project_address: projectid };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete(post_url, new http_1.RequestOptions({
            headers: headers,
            body: body
        }))
            .catch(this.error_handler);
    };
    // Returns json data about successful withdrawing.
    RestapiService.prototype.widraw_funding = function (accountid, projectid) {
        var post_url = this._url + 'project_owner/' + accountid;
        var body = { project_address: projectid };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(post_url, body, { headers: headers })
            .catch(this.error_handler);
    };
    //Get the List of project
    RestapiService.prototype.get_projects = function () {
        return this.http.get(this._url + 'backer/projects');
    };
    /*  API ERROR HANDLER
    ***********
    **********
    *********/
    //Error Handler in Response
    RestapiService.prototype.error_handler = function (err) {
        console.log('Error occurred :' + err);
        return Observable_1.Observable.throw(err || 'some error on server');
    };
    return RestapiService;
}());
RestapiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RestapiService);
exports.RestapiService = RestapiService;
//# sourceMappingURL=restapi.service.js.map