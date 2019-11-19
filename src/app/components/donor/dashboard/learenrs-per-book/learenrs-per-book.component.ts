import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestService } from 'src/app/services/request/request.service';
import { learner } from 'src/app/classes/learner';
import { AddLearningService } from 'src/app/services/addLearning/add-learning.service';
import { matching } from 'src/app/classes/matching';

@Component({
  selector: 'app-learenrs-per-book',
  templateUrl: './learenrs-per-book.component.html',
  styleUrls: ['./learenrs-per-book.component.css']
})
export class LearenrsPerBookComponent implements OnInit {

  constructor(private route:ActivatedRoute,private req:RequestService,private learning:AddLearningService) { }
bookId
m:matching;
learners:learner[]
  ngOnInit() {
    this.route.params
    .subscribe((paramsFromUrl: Params) => {
      console.log('paramsFromUrl!!!', paramsFromUrl);
      this.bookId = paramsFromUrl.bookId;
    });

    this.req.getLearnersForBookByDonor(this.bookId,sessionStorage.getItem('userEmail').slice(0,-4)).subscribe
    (success => {this.learners = success as learner[],console.log(this.learners) ;},
       error => {console.log(error); });
  }
  deleteMatch(l:learner){
    debugger
    this.learning.deleteMatchByDonorLearnerAndBook(sessionStorage.getItem('userEmail').slice(0,-4),l.learnerId,this.bookId).subscribe
    (success => {this.m = success as matching,console.log(this.m) ;},
    error => {console.log(error); });
  }

}
