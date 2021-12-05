import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NewGroupFormComponent } from "../new-group-form/new-group-form.component";

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.css']
})
export class CreateGroupsComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    openDialog() {

        const dialogRef = this.dialog.open(NewGroupFormComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnInit(): void {}

}
