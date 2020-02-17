import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { book } from '../../../../classes/book';
import { RequestService } from '../../../../services/request/request.service';
import { delay } from 'rxjs/operators';
import {TreeNode} from 'primeng/api';
import { forEach } from '@angular/router/src/utils/collection';
import { TreeTable } from 'primeng/treetable';
import * as $ from 'jquery';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Output() continue = new EventEmitter();
  @Output() back = new EventEmitter();
  bookListFromServerCopy: book[];
  constructor(private req: RequestService,private bookService:BookService) { }
myList;
list: TreeNode[];
selectedNodes: TreeNode[];
  newBook: boolean;
  chosen: book;
  children: book[];
  jsonChildren = [];
  events: any[];
  cars: any[];
  firstAncester: book;
  bookListFromServer: book[];
  booksToView: TreeNode[];
  showBookDataTable = false;
  colHeader: { field: string; header: string; }[];
cols2: any[];

jsonChildrenInner = [];

  newTreeNodes: TreeNode[];

  ngOnInit() {
  //   this.cars = [
  //     {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
  //     {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
  //     {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
  //     {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
  //     {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
  //     {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
  //     {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
  //     {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
  //     {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
  // ];


this.cols2 = [
  { field: 'BookId', header: 'קוד ספר' },
  { field: 'BookName', header: 'שם' },
  { field: 'Bookpayment', header: 'תשלום' },
  { field: 'Bookinfo', header: 'פרטים נוספים' }

];
this.list = [];
this.bookListFromServerCopy=[];
//fills rhe service's properties with data
this.bookService.getBooks();
  }

  createNewBookArea() {
    this.newBook = true;
  }

// endless loop
  buildTreeNodes(book: book): any {
debugger;
    // find children if exist
    this.children = this.bookListFromServer;
    if (this.children !== undefined) {
    this.children = this.children.filter(
      function(child) {
        return child.ParentId === book.BookId; });


// found no deeper objects - no children, return undefined.

    if (this.children.length === 0) {
      return undefined;
    } else {
      // deal with the children
      this.children.forEach(child => {
        // send each child to the recursive function and get a json array of them
        this.jsonChildrenInner = this.buildTreeNodes(child);
        // then push them into another existing json array --- jsonChildren
        // if ... else to build the "children" part of json only if they actually exist.
        // jsonChildrenInner holds the results of the recursive function
        if (this.jsonChildrenInner !== undefined) {
        this.jsonChildren.push({'data': child, 'children': this.jsonChildrenInner});
        } else {
          this.jsonChildren.push({'data': child});
        }
      });
      // after the recursion is done---add the results to an outer array by the name of list
      if (this.jsonChildren !== undefined) {
      this.list.push({'data': book, 'children': this.jsonChildren});
      } else {
        this.list.push({'data': book});
      }
    }
     return this.jsonChildren;
  }
  return undefined;
}


convertToTreeNode(books: book[]) {
  if (books !== undefined) {
books.forEach(book => {
  this.newTreeNodes.push({'data': book, 'children': [{'data': this.convertToTreeNode(book.Children)}] });
}); }
return this.newTreeNodes;
}



// doesn't nest properly
buildTreeNodeNoRecursion(books: book[]) {
  debugger;
books.forEach(book => {
    // find children and mark them as used to avoid looping and concating them to the final result
  if (book.used !== true) {

  // this.children = books.filter(function(b) {
  //   if( b=>b.ParentId==book.BookId)
  //   b.used=true;
  //   return b});
  this.children = books.filter(b => b.ParentId === book.BookId);
  this.children.forEach(c => {
    c.used = true;
  });
 // // this.buildTreeNodeNoRecursion(this.children);
// add the current book to final list
  this.list.push({'data': book, 'children': [{'data': this.buildTreeNodeNoRecursion(this.children)}]});

  //  book.Children = this.children;
  }
});
// return JSON.stringify(books);
return books;
}



// get book[] return treeNode

// create a list of treenodes
// loop throw the children and convert them into - one at a time, single instance of treenode
// which will be pushed into the local list

 // return the object with the current book as "data"
 //  set as "children": recall of the function for the list of children
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
changed(e){
 console.log(e.target.data)
}
print(val)
{
console.log(val);
}
oldPayment;
nodeId;
oldVal;
modelChanged(bookId,oldVal, param) {
  // debugger
  // we used ngModelChange so we got the parameter --i is the book id and param is the new price
console.log(bookId + ' ' + oldVal,+''+ param);
//find the node's index by bookId
for (let i=0;i<this.bookService.bookListFromServer.length;i++){
if(this.bookService.bookListFromServer[i].BookId ==bookId){
  this.nodeId=i;
break;
}

}
this.updateParents(this.nodeId);
this.list = this.convert(this.bookListFromServer, true)
}
node;
parentId;

updateParents(nodeId: number) {
  //find the node
  //  debugger
   this.node = this.bookService.bookListFromServer[nodeId];
   this.oldPayment = + this.node.Bookpayment;
   console.log(this.oldPayment)
  if (this.node.ParentId != 1004) {
    //find father update and recall the function
    for (let i=0;i<this.bookService.bookListFromServer.length;i++){
      if(this.bookService.bookListFromServer[i].BookId == this.node.ParentId){
        this.parentId=i;
      break;
      }
    }
    // this.req.getBooksAny().subscribe(
    //   success => {this.bookListFromServerCopy=success, this.oldPayment = + this.bookListFromServerCopy[nodeId].Bookpayment;
    //      },error=>console.log(error));
        //  console.log($('#input')[0].defaultValue)
      this.bookService.bookListFromServer[this.parentId].Bookpayment -= + this.oldPayment;
      this.bookService.bookListFromServer[this.parentId].Bookpayment += +this.bookService.bookListFromServer[nodeId].Bookpayment;
      this.updateParents(this.parentId);
  }

}
confirmBooks(){
 let i=0;
 debugger
  this.selectedNodes.forEach(node => {
    this.req.reqBooks[i++]= node.data
  });
 console.log(this.req.reqBooks)
 debugger
 this.req.calcTotalPayments();
}

next(){
  this.continue.emit(true);
 
}

prev(){
  this.back.emit(true);
 
}
}
