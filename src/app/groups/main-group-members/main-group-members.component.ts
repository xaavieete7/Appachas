import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupsService} from "../../service/groups.service";
import {AuthService} from "../../service/auth.service";
import User from "../../models/user";

@Component({
    selector: 'app-main-group-members',
    templateUrl: './main-group-members.component.html',
    styleUrls: ['./main-group-members.component.css']
})
export class MainGroupMembersComponent implements OnInit {

    links = [['Transactions', 'join'], ['Settle debts', 'debts'], ['Members', 'members'], ['Recent activity', 'activities']];
    group_id: String | null | undefined
    activeLink = this.links[2][0];
    name: string | undefined;
    color: string | undefined;
    currency: string | undefined;
    numMembers: string | undefined;
    members: any[] | undefined;

    constructor(private route: ActivatedRoute, private service: GroupsService, private  auth: AuthService) {
        this.members = [];
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

        // Get member information
        this.service.getGroupMembers(this.group_id).subscribe((res: any) => {

            for (let i = 0; i < res.length; i++) {
                this.auth.getUser(res[i].uid).subscribe((res: any) => {
                    this.members?.push(res);
                });
            }

            this.numMembers = res.length;
        });

    }

    getLink(url: string) : string {
        return "/group/" + this.group_id + "/" + url;
    }

}
