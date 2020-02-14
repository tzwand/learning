import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';
import { book } from 'src/app/classes/book';
import { learner } from 'src/app/classes/learner';
import { offer } from 'src/app/classes/offer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css']
})
export class DonorDashboardComponent implements OnInit {
numOfCurrentLearnersForBook;
bookRequestAmount;
books = [];
reqs:offer[];
LearnersForBookByDonor: learner[];
BooksForLearnerByDonor: book[];
allBooksForRequest: book[];

numberOfActiveLearning = 4;
  constructor(private req: RequestService,private router: Router) { }

  ngOnInit() {


    this.req.getReqsByDonor(sessionStorage.getItem('userEmail').slice(0,-4)).subscribe
    (success => {this.reqs = success as offer[],console.log(this.reqs) ;},
       error => {console.log(error); });
    // ----------------------------------------to activate when working------------------------------------------:
    // this.learners = this.req.getLearnersForRequest();
    // ---filter by type of learner or get it filterd from server.

    // this.numberOfActiveLearning=this.req.getCountActiveLearningForBook()

    // this.books= this.req.getBooksByDonor();
     // this.allBooksForRequest=this.req.getAllBooksForRequest();
    // --------------these are done per book---send a request from HTML inside ngFor?
    // ----need to add amount for request
    // this.bookRequestAmount=this.req.donorbook.amount;
    // this.numOfCurrentLearnersForBook=this.req.getCountMatchingsForRequest();
//     this.BooksForLearnerByDonor= this.req.getBooksForLearnerByDonor();
// this.LearnersForBookByDonor=this.req.getLearnesForBookByDonor();

  }
  showLearners(){ }
addNewRequest()
{
  this.router.navigate(['/donor']);
}
}
