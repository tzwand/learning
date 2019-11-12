import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestService } from 'src/app/services/request/request.service';
import { learner } from 'src/app/classes/learner';

@Component({
  selector: 'app-learenrs-per-book',
  templateUrl: './learenrs-per-book.component.html',
  styleUrls: ['./learenrs-per-book.component.css']
})
export class LearenrsPerBookComponent implements OnInit {

  constructor(private route:ActivatedRoute,private req:RequestService) { }
bookId
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

}
