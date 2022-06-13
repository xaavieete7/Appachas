import { Injectable } from '@angular/core';
import { getAuth } from "firebase/auth";
import {FirebaseUISignInSuccessWithAuthResult} from "firebaseui-angular";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Router} from "@angular/router";
import User from "../models/user";
import {getDatabase, ref, set} from "firebase/database";
import {async, Observable, Subject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as firebase from "firebase/compat/";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userRef: AngularFireList<User>;
    private dbUsersPath = "/users";
    public loggedIn = false;

    constructor(private db: AngularFireDatabase, private router: Router, private afAuth: AngularFireAuth) {
        this.userRef = db.list(this.dbUsersPath);
    }

    getCurrentUserId(): string {

        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            return user.uid;
        }

        return "";

    }

    addUser(data: FirebaseUISignInSuccessWithAuthResult): void {

        const uid = data.authResult.user?.uid

        this.db.list('/users/' + uid)
            .valueChanges()
            .subscribe(items => {

                // If the user doesn't exist
                if (items.length == 0) {

                    const db = getDatabase();
                        set(ref(db, 'users/' + uid), {
                            name: data.authResult.user?.displayName,
                            email: data.authResult.user?.email,
                            url: data.authResult.user?.photoURL
                        });
                }
            });

    }

    getUser(uid: string): Observable<any> {

        const info = new Subject<unknown>();

        this.db.list('/users/' + uid)
            .valueChanges()
            .subscribe(items => {
                info.next(items);
            });

        return info.asObservable();

    }

}
