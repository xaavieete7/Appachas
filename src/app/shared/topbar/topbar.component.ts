import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

    isLoggedIn = false;
    username: string | null | undefined = "";
    email: string | null | undefined = "";
    photoURL: string | null | undefined = null;

    constructor(private afAuth: AngularFireAuth) { }

    ngOnInit(): void {

        this.photoURL = "/assets/img/broken-avatar.png";

        this.afAuth.authState.subscribe((user) => {
            this.username = user?.displayName;
            this.email = user?.email;
            this.photoURL = user?.photoURL;
            this.isLoggedIn = !!user;
        });

    }

    logout() {
        this.afAuth.signOut().then(function () {
            console.log("FUNCIONA");
        }, function (error) {
            console.log("EROOR");
        })
    }



}
