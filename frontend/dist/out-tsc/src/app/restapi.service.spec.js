"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var restapi_service_1 = require("./restapi.service");
describe('RestapiService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [restapi_service_1.RestapiService]
        });
    });
    it('should be created', testing_1.inject([restapi_service_1.RestapiService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=restapi.service.spec.js.map