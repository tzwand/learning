import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-learner-event-details',
  templateUrl: './learner-event-details.component.html',
  styleUrls: ['./learner-event-details.component.css']
})
export class LearnerEventDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LearnerEventDetailsComponent>, @Inject(MAT_DIALOG_DATA) private learnerEvent) { }
event:any;
  ngOnInit() {
    debugger
    this.event = this.learnerEvent.event ? this.learnerEvent.event : ''

  }
  submit() {
    this.dialogRef.close();

  }

}
