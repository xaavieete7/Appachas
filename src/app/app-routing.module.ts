import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {MainGroupComponent} from "./groups/main-group/main-group.component";

const routes: Routes = [
    { path: 'group/:id', component: MainGroupComponent},
    { path: '', component: HomepageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
