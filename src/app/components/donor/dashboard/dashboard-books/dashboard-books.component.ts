import { Component, OnInit } from '@angular/core';
import { offer } from 'src/app/classes/offer';
import { RequestService } from 'src/app/services/request/request.service';
import { book } from 'src/app/classes/book';

@Component({
  selector: 'app-dashboard-books',
  templateUrl: './dashboard-books.component.html',
  styleUrls: ['./dashboard-books.component.css']
})
export class DashboardBooksComponent implements OnInit {
 reqs: offer[];
books:book[];
  constructor(private req: RequestService) { }

  ngOnInit() {
    this.req.getBooksByDonor(sessionStorage.getItem('userEmail').slice(0,-4)).subscribe
    (success => {this.books = success as book[],console.log(this.reqs) ;},
       error => {console.log(error); });
  }

}
