import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddLearningService } from 'src/app/services/addLearning/add-learning.service';
@Component({
  selector: 'app-learner-event-details',
  templateUrl: './learner-event-details.component.html',
  styleUrls: ['./learner-event-details.component.css']
})
export class LearnerEventDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LearnerEventDetailsComponent>, @Inject(MAT_DIALOG_DATA) private learnerEvent, private learning:AddLearningService) { }
event:any;
  ngOnInit() {
    debugger
    this.event = this.learnerEvent.event ? this.learnerEvent.event : ''
console.log(event)
  }
  submit() {
    this.dialogRef.close();
  }

  cancelLearning(){
    debugger
this.learning.deleteMatchByDonorLearnerAndBook(this.event.extendedProps.donorEmail.slice(0,-4),sessionStorage.getItem('learnerId') as unknown as number,this.event.extendedProps.bookId).subscribe((success)=>console.log("match deleted"),(error)=>console.log(error))
this.dialogRef.close();
}

}
