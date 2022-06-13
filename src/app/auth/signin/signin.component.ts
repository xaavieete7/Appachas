import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {AuthService} from "../../service/auth.service";


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


    constructor(private afAuth: AngularFireAuth, private auth: AuthService) { }

    ngOnInit(): void { }

    logout() {
        this.afAuth.signOut().then(function () {
            console.log("FUNCIONA");
        }, function (error) {
            console.log("EROOR");
        })
    }

    successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
        this.auth.addUser(data);
    }

    errorCallback(data: FirebaseUISignInFailure) {
        console.warn('errorCallback', data);
    }

    uiShownCallback() {
        console.log('UI shown');
    }

}
