import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'dialog-success',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialog.closeAll();
  }

}
