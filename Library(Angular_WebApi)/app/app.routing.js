"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
//import { HomeComponent } from './components/home.component';
//import { UserComponent } from './components/user.component';
var book_component_1 = require("./components/book.component");
var userDTO_component_1 = require("./components/userDTO.component");
var appRoutes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home', component: HomeComponent },
    //{ path: 'user', component: UserComponent },
    { path: '', redirectTo: 'book', pathMatch: 'full' },
    { path: 'book', component: book_component_1.BookComponent },
    { path: 'userDTO', component: userDTO_component_1.UserDtoComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map