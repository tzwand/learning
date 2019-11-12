import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Time } from '../../classes/Time';
import { occupation } from '../../classes/occupation';
import { donor } from '../../classes/donor';
import { book } from '../../classes/book';
import { learner } from 'src/app/classes/learner';
import { offer } from 'src/app/classes/offer';

@Injectable({
  providedIn: 'root'
})
export class RequestService {




  times=null;
  donor: donor;
  donorbook: book;
  occupations: Array<occupation>;
  purposes: Array<string>;
  // bookListFromServer: book[];

  constructor(private http: HttpClient) {
    this.donorbook = new book(2, 'ספר לדוגמא', 30, 'nice');
    this.donor = new donor('ששש@הדה', '123456789', 'אריה כהן');
    this.donor.Book = this.donorbook;
    this.donor.gender = 'זכר'
    this.donor.occuptionDesc = 'בחור ישיבה'
    this.donor.payment = 100;
    this.donor.reqEndDate = new Date('02/09/2019');
    this.donor.reqPurpose = 'להצלחת הפרויקט במהירות'
    this.donor.reqStartDate = new Date('02/09/2019');
    this.donor.sosDate = null;
  


  }
  getTimes() {
    if (this.times == null) {
      this.http.get<Array<Time>>(environment.BASIC_URL + 'api/forRequest/GetTimes').subscribe(success => { this.times = success; }, error => { console.log(error); });
    }
    console.log(this.donor);
    

  }
  getOccuptions(): Observable<Array<occupation>> {
    if (this.occupations == null) {
      return this.http.get<Array<occupation>>(environment.BASIC_URL + 'api/forRequest/GetOccupations');
    }
    return null;
  }
  getPurposes(): Array<string> {
    return environment.purposeList;
  }
  getRegularSum(): Observable<number> {
    return this.http.get<number>(environment.BASIC_URL + 'api/forRequest/getRegularSum/' + this.donor.Book.BookName);
  }
  getBooksAny(): Observable<any> {
    return this.http.get<any>(environment.BASIC_URL + 'api/forRequest/GetBooks');
  }
  // getBooks() {
  //    this.http.get<Array<book>>(environment.BASIC_URL + 'api/forRequest/GetBooks').subscribe(
  //     success => {this.bookListFromServer = success;  })
  // }


sendReq(): void {
    this.http.post<boolean>(environment.BASIC_URL + 'api/forRequest/addRequest', this.donor);
  };

getLearnersForRequest(reqId:number):Observable<Array<learner>>
{
  return this.http.get<Array<learner>>(environment.BASIC_URL + 'api/learner/getLearnesForBookByReq/' + reqId);
}

getLearnersForBookByDonor(bookId:number,donorId:string):Observable<Array<learner>>
{
  return this.http.get<Array<learner>>(environment.BASIC_URL + 'api/learner/getLearnesForBookByDonor/' + bookId+'/'+donorId);
}
getLearnersFordonor(donorId:string):Observable<Array<learner>>
{
  return this.http.get<Array<learner>>(environment.BASIC_URL + 'api/learner/getLearnersByDonor/' + donorId);
}
  getCountActiveLearningForBook(reqId:number): number {
    throw new Error("Method not implemented.");
  }
  getBooksByDonor(donorId):Observable<book[]> {
    return this.http.get<Array<offer>>(environment.BASIC_URL + 'api/learner/getBooksByDonor/' + donorId );
  }
  getReqsByDonor(donorId):Observable<offer[]> {
    return this.http.get<Array<offer>>(environment.BASIC_URL + 'api/learner/getReqsByDonor/' + donorId );
  }
//whe they are a few books per request
  getAllBooksForRequest(reqId: number): book[] {
    throw new Error("Method not implemented.");
  }
  // getLearnesForBookByDonor(reqId:number): learner[] {
  //   throw new Error("Method not implemented.");
  // }
  //will go to matching table, get reqId and find in req table all req with same donor id
  getBooksForLearnerByDonorBooks(learnerId:number,donorId:number): Observable<Array<offer>>{
    return this.http.get<Array<offer>>(environment.BASIC_URL + 'api/learner/getBooksForLearnerByDonorBooks/' + learnerId +'/'+donorId) ;
  }
  getCountMatchingsForRequest(reqId :number): number {
    throw new Error("Method not implemented.");
  }
}
