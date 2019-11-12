import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { TreeNode } from 'primeng/api';
import { book } from 'src/app/classes/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  list = [];
  bookListFromServer=[];
  showBookDataTable= false;
  children: any[];
  constructor(private http:HttpClient) { }
  getBooksAny(): Observable<any> {
    return this.http.get<any>(environment.BASIC_URL + 'api/forRequest/GetBooks');
  }
getBooks(){
  this.getBooksAny().subscribe(
    success => {
      // get data- books from server
       console.log(success),
       this.bookListFromServer = success,
      console.log((this.convert(this.bookListFromServer, true))),
     // on success --- this.list is filled with the results of a conversion function
      this.list = this.convert(this.bookListFromServer, true),
      // for debugging proccess
      console.log(JSON.stringify(this.list)),
       this.showBookDataTable = true;
       }
  );
      }
  convert(books: book[], firstLoop: boolean): TreeNode[] {
    const treeNodes = [];

  // find books for the first book
  if (firstLoop === true) {
  this.children = this.bookListFromServer;
    // find children for first loop -- only single book to create and send to the recursive call
  if (this.children !== undefined) {
    this.children = this.children.filter(child => child.ParentId === books[0].BookId);
  }
  // if they aren't any children and therefore the required result has only the propery of "data"
  if (this.children.length === 0 || this.children === undefined) {
  treeNodes.push({'data': book[0]});
  } else {
    treeNodes.push({'data': books[0], 'children': this.convert(this.children, false)});
  }
    return treeNodes;
  } else {
    books.forEach(child => {
    // find each child's children to send on to the recursive function
    this.children = this.bookListFromServer;
    if (this.children !== undefined) {
    this.children = this.children.filter(innerChild => innerChild.ParentId === child.BookId);
     }
     // as written above --- if they aren't any children and therefore the required result has only the propery of "data"
    if (this.children.length === 0 || this.children === undefined) {
    treeNodes.push({'data': child});
    } else {
    treeNodes.push({'data': child, 'children': this.convert(this.children, false)});
    }
    });
    return treeNodes;
  }
  }
}
