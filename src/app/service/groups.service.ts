import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';
import Group from '../models/group';
import Member from "../models/member";
import {child, get, onValue} from "@angular/fire/database";
import {AuthService} from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class GroupsService {

    groupRef: AngularFireList<Group>;
    membersRef: AngularFireList<Member>;
    private dbGroupPath = "/groups";
    private dbMembersPath = "/members";

    constructor(private db: AngularFireDatabase, private auth: AuthService) {
        this.groupRef = db.list(this.dbGroupPath);
        this.membersRef = db.list(this.dbMembersPath);
    }

    addGroups(group: Group) : void  {

        this.groupRef.push({
            "name": group.name,
            "color": group.color,
            "currency": group.currency
        }).then((group) => {

            this.addMember(this.auth.getCurrentUserId(), group.key);

            console.log(this.getGroup(group.key));
        });

    }

    addMember(uid: string, gid: string | null) {

        console.log("uid: " + uid);
        console.log("gid: " + gid);

        const db = getDatabase();
        set(ref(db, 'members/' + gid + '/' + uid), {
            uid: uid,
            active: true
        });

        console.log(this.getGroupMembers(gid));

    }

    getGroupMembers(gid: string | null): any {

        const dbRef = ref(getDatabase());
        get(child(dbRef, '/members/' + gid)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return "No data available";
            }
        });
    }

    getGroup(id: string | null): any {

        const dbRef = ref(getDatabase());
        get(child(dbRef, '/groups/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
    }
}


