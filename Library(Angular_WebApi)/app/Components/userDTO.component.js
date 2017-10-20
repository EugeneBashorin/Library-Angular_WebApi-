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
var userDTO_service_1 = require("../Service/userDTO.service");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var global_1 = require("../Shared/global");
var UserDtoComponent = (function () {
    function UserDtoComponent(fb, _userDtoService) {
        this.fb = fb;
        this._userDtoService = _userDtoService;
        this.indLoading = false;
    }
    UserDtoComponent.prototype.ngOnInit = function () {
        this.userFrm = this.fb.group({
            Id: [''],
            Email: [''],
            Password: [''],
            UserName: [''],
            Name: [''],
            Role: [''],
            IsBanned: [''],
        });
        this.LoadUsersDto();
    };
    UserDtoComponent.prototype.LoadUsersDto = function () {
        var _this = this;
        this.indLoading = true;
        //this._userDtoService.getData()
        //   .subscribe(usersDto => { this.usersDto = usersDto; this.indLoading = false });
        //  error => this.msg = <any>error);
        this._userDtoService.get(global_1.Global.BASE_USER_DTO_ENDPOINT)
            .subscribe(function (usersDto) { _this.usersDto = usersDto; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    return UserDtoComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], UserDtoComponent.prototype, "modal", void 0);
UserDtoComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/userDTO.component.html'
    }),
    core_2.Injectable(),
    __metadata("design:paramtypes", [forms_1.FormBuilder, userDTO_service_1.UserDtoService])
], UserDtoComponent);
exports.UserDtoComponent = UserDtoComponent;
//# sourceMappingURL=userDTO.component.js.map