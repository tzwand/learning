import { Component, OnInit, Inject } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbDialogRef } from '@nebular/theme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddLearningService } from 'src/app/services/addLearning/add-learning.service';
import { offer } from 'src/app/classes/offer';
import { matching } from 'src/app/classes/matching';
@Component({
  selector: 'app-confirm-learning',
  templateUrl: './confirm-learning.component.html',
  styleUrls: ['./confirm-learning.component.css']
})
export class ConfirmLearningComponent implements OnInit {
offer:offer;
  constructor( private dialogRef: MatDialogRef<ConfirmLearningComponent>,private addLearning:AddLearningService,
    @Inject(MAT_DIALOG_DATA) private data
    )
    //  @Inject(NB_WINDOW_CONTEXT) context)
    {
    this.book;
   }
book;
  ngOnInit() {
    this.book = this.data ? this.data.data : ''
    this.offer=this.addLearning.addedBookToLearn;
    console.log(this.offer);
  }
  submit(shouldAddLearning:boolean) {
    this.dialogRef.close(shouldAddLearning);

  }

}
