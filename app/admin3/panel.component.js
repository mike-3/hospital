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
var core_1 = require('@angular/core');
require('./rxjs-operators');
var http_1 = require('@angular/http');
var rooms_service_1 = require("../rooms-service");
var AdminPanel = (function () {
    function AdminPanel(http, roomsService) {
        this.http = http;
        this.roomsService = roomsService;
    }
    AdminPanel.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.currentItem)
            this.toolsDisadled = true;
        this.getData();
        this.roomsService.selectedItem$.subscribe(function (item) {
            _this.currentItem = item;
            _this.toolsDisadled = item.selected ? false : true;
        });
    };
    AdminPanel.prototype.saveData = function () {
        var _this = this;
        this.rooms.forEach(function (item) {
            delete item.selected;
        });
        var out = new rooms_service_1.VOIp_Rooms({
            vers: this.vers++,
            rooms: this.rooms
        });
        this.roomsService.saveRooms(out).subscribe(function (res) {
            _this.toolsDisadled = true;
        });
    };
    AdminPanel.prototype.onSaveClick = function () {
        this.saveData();
    };
    AdminPanel.prototype.onAddClick = function () {
        this.rooms.push(new rooms_service_1.VOIpRoom({ IP: '', ID: '' }));
    };
    AdminPanel.prototype.onDeleteClick = function () {
        var _this = this;
        if (!this.currentItem)
            return;
        if (confirm('You want to delete ip "' + this.currentItem.IP + '"?')) {
            this.toolsDisadled = true;
            this.roomsService.deleteRoom(this.currentItem).subscribe(function (res) {
                _this.getData();
                console.log(res);
            });
        }
    };
    AdminPanel.prototype.onDeleteItemClick = function (item) {
        var _this = this;
        if (confirm('You want to delete ip "' + item.IP + '"?')) {
            this.toolsDisadled = true;
            this.roomsService.deleteRoom(item).subscribe(function (res) {
                _this.getData();
                console.log(res);
            });
        }
    };
    AdminPanel.prototype.getData = function () {
        var _this = this;
        this.roomsService.getRooms().subscribe(function (res) {
            _this.vers = res.vers;
            _this.rooms = res.rooms;
        });
    };
    AdminPanel.prototype.onIpRoomClick = function (item) {
        this.roomsService.selectItem(item);
    };
    AdminPanel = __decorate([
        core_1.Component({
            selector: 'admin-panel',
            template: "\n        <div class=\"container\">\n            <div class=\"container navbar navbar-fixed-top\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12 text-center\">\n                        <h1>Admin panel</h1>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"tools\">\n                        <div class=\"col-xs-3\">\n                            <button class=\"btn btn-primary\" (click) = \"onSaveClick()\">Save</button>\n                            <button class=\"btn btn-primary\" (click) = \"onAddClick()\">Add</button>\n                            <button class=\"btn btn-primary\" (click) = \"onDeleteClick()\" [disabled]=\"toolsDisadled\">Delete</button>\n                        </div>\n                        <div class=\"col-xs-3 col-xs-offset-6 text-right\">\n                            <button class=\"btn btn-success\" routerLink=\"icons-manager\">Icons Manager</button>\n                            <button class=\"btn btn-success\" routerLink=\"config-manager\">Config Manager</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row m-top\">\n                <div class=\"col-xs-12\">\n                    <div class=\"panel panel-default psh pb\">\n                        <div class=\"panel-body\">\n                            <table class=\"table table-condensed table-striped\">\n                                <thead>\n                                    <tr>\n                                        <th>IP</th>\n                                        <th>ROOM</th>\n                                        <th></th>\n                                    </tr>\n                                </thead>\n                                <tbody class=\"tablebody\">\n                                    <tr style=\"height: 1.5px;\"></tr>\n                                    <tr class=\"ip-room-item\" *ngFor=\"let item of rooms\" (click)=\"onIpRoomClick(item)\" [class.selected]=\"item.selected\">\n                                        <td class=\"text-center\">\n                                            <input \n                                                placeholder=\"0.0.0.0\" \n                                                name=\"IP\" \n                                                [(ngModel)] = \"item.IP\"\n                                                minlength=\"7\"\n                                                maxlength=\"15\"\n                                                required\n                                                />\n                                        </td>\n                                        <td class=\"text-center\">\n                                            <input \n                                                placeholder=\"ID ROOM\"\n                                                [(ngModel)] = \"item.ID\"\n                                                name=\"ID\"\n                                                ngModel\n                                                minlength=\"1\"\n                                                pattern=\"[0-9]+\"\n                                                required/>\n                                        </td>\n                                        <td class=\"text-center\">\n                                            <a *ngIf=\"item.selected\" class=\"btn fa fa-times-circle\" (click) = \"onDeleteItemClick(item)\"></a>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n",
            styles: ["\n\n         .m-top{\n            margin-top: 120px;\n         }\n\n        .form-group{\n            display: inline-block;\n            margin: 0 5px;\n        }\n        .selected{\n            border: 2px solid #ff7e00;\n        }\n        input{\n            padding: 0 5px;\n            text-align: center;\n        }\n        .fright{\n            float: right;\n        }\n        #tableone td{\n            vertical-align: middle;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [http_1.Http, rooms_service_1.RoomsService])
    ], AdminPanel);
    return AdminPanel;
}());
exports.AdminPanel = AdminPanel;
//# sourceMappingURL=panel.component.js.map