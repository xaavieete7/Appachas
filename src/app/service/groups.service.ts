import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';
import Group from '../models/group';
import Member from "../models/member";
import {child, get} from "@angular/fire/database";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class GroupsService {

    groupRef: AngularFireList<Group>;
    membersRef: AngularFireList<Member>;
    private dbGroupPath = "/groups";
    private dbMembersPath = "/members";

    constructor(private db: AngularFireDatabase, private auth: AuthService, private router: Router) {
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

            // Redirect to groups
            this.router.navigate(['/group', group.key]);
        });

    }

    addMember(uid: string, gid: string | null) {

        const db = getDatabase();
        set(ref(db, 'members/' + gid + '/' + uid), {
            uid: uid,
            active: true
        });

    }

    getGroupMembers(gid: String | null | undefined): any {

        const members = new Subject<unknown>();

        this.db.list('/members/' + gid)
            .valueChanges()
            .subscribe(items => {
                members.next(items);
            });

        return members.asObservable();
    }

    getGroup(id: String | null | undefined): any {

        const info = new Subject<unknown>();

        this.db.list('/groups/' + id)
            .valueChanges()
            .subscribe(items => {
                info.next(items);
            });

        return info.asObservable();
    }

    getGroups(uid: string | undefined) {

        const dbRef = ref(getDatabase());
        get(child(dbRef, '/members/')).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return "No data available";
            }
        });

    }

}


