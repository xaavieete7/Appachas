import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../service/auth.service";
import {GroupsService} from "../service/groups.service";

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    isLoggedIn = false;
    user_id: string | undefined = "";

    constructor(private afAuth: AngularFireAuth,  private auth: AuthService, private service: GroupsService) { }

    ngOnInit(): void {

        this.afAuth.authState.subscribe((user) => {
            this.isLoggedIn = !!user;

            if (this.isLoggedIn) {
                this.user_id = this.auth.getCurrentUserId();
            }
        });

    }

}
