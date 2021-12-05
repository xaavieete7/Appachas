import { Injectable } from '@angular/core';
import { getAuth } from "firebase/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    getCurrentUserId(): string {

        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            return user.uid;
        }

        return "";

    }


}
