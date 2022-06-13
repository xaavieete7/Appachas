import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "../../service/groups.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
    selector: 'app-main-group-info',
    templateUrl: './main-group-info.component.html',
    styleUrls: ['./main-group-info.component.css']
})
export class MainGroupInfoComponent implements OnInit {

    group_id: String | null | undefined
    name: string | undefined;
    color: string | undefined;
    currency: string | undefined;
    members: string | undefined;
    isloggedIn: boolean | undefined;

    constructor(private route: ActivatedRoute, private redirectRouter: Router, private service: GroupsService, private afAuth: AngularFireAuth) {

        this.afAuth.authState.subscribe((user) => {
            this.isloggedIn = !!user;
        });
    }

    ngOnInit(): void {

        // Get id param
        this.route.paramMap.subscribe( paramMap => {
            this.group_id = paramMap.get('id');
        });

        // Get group information
        this.service.getGroup(this.group_id).subscribe((res: any) => {
            this.color = res[0];
            this.currency = res[1];
            this.name = res[2];
        });

        // Get number of members
        this.service.getGroupMembers(this.group_id).subscribe((res: any) => {
            this.members = res.length;
        });

    }

}
