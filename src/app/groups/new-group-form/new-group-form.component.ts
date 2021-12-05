import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {GroupsService} from "../../service/groups.service";

@Component({
    selector: 'app-new-group-form',
    templateUrl: './new-group-form.component.html',
    styleUrls: ['./new-group-form.component.css']
})
export class NewGroupFormComponent implements OnInit {

    groupForm = this.formBuilder.group({
        name: '',
        currency: '',
        color: ''
    });

    constructor(private formBuilder: FormBuilder,
                public service: GroupsService) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.service.addGroups(this.groupForm.value);
    }
}
