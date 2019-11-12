import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';
import { learner } from 'src/app/classes/learner';
import { offer } from 'src/app/classes/offer';
import { book } from 'src/app/classes/book';

@Component({
  selector: 'app-books-for-learner',
  templateUrl: './books-for-learner.component.html',
  styleUrls: ['./books-for-learner.component.css']
})
export class BooksForLearnerComponent implements OnInit {
  @Input() learner:learner;
  @Output() countActiveLearning = new EventEmitter<number>();
learners: learner[];
books: book[];
  constructor( private req:RequestService) { }

  ngOnInit() {
    this.req.getBooksForLearnerByDonorBooks(this.learner.learnerId,
      sessionStorage.getItem('userEmail').slice(0,-4) as unknown as number).subscribe
    (success => {this.books = success as book[], console.log(this.books);
      //output the number of active learnings
      this.countActiveLearning.emit(this.books.length)},
       error => {console.log(error);});
  }


}
