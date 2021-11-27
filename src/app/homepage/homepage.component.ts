import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    isLoggedIn = false;

    constructor(private afAuth: AngularFireAuth) { }

    ngOnInit(): void {

        this.afAuth.authState.subscribe((user) => {
            this.isLoggedIn = !!user;
        });

    }

}
