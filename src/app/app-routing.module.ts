import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {MainGroupComponent} from "./groups/main-group/main-group.component";
import {MainGroupJoinComponent} from "./groups/main-group-join/main-group-join.component";
import {MainGroupDebtsComponent} from "./groups/main-group-debts/main-group-debts.component";
import {MainGroupMembersComponent} from "./groups/main-group-members/main-group-members.component";
import {MainGroupActivitiesComponent} from "./groups/main-group-activities/main-group-activities.component";

const routes: Routes = [
    { path: 'group/:id/:tab', component: MainGroupComponent },
    { path: 'group/:id', component: MainGroupComponent },
    /*{ path: 'group/:id/join', component: MainGroupJoinComponent },
    { path: 'group/:id/debts', component: MainGroupDebtsComponent },
    { path: 'group/:id/members', component: MainGroupMembersComponent },
    { path: 'group/:id/activities', component: MainGroupActivitiesComponent },*/
    { path: '', component: HomepageComponent },
    { path: '**', component: HomepageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
