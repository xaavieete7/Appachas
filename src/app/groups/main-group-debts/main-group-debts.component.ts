import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupsService} from "../../service/groups.service";

@Component({
    selector: 'app-main-group-debts',
    templateUrl: './main-group-debts.component.html',
    styleUrls: ['./main-group-debts.component.css']
})
export class MainGroupDebtsComponent implements OnInit {

    links = [['Transactions', 'join'], ['Settle debts', 'debts'], ['Members', 'members'], ['Recent activity', 'activities']];
    group_id: String | null | undefined
    activeLink = this.links[1][0];
    name: string | undefined;
    color: string | undefined;
    currency: string | undefined;

    constructor(private route: ActivatedRoute, private service: GroupsService) {}

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

    }

    getLink(url: string) : string {
        return "/group/" + this.group_id + "/" + url;
    }

}
