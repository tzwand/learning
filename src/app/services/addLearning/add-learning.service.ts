import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { offer } from '../../classes/offer';
import { learner } from '../../classes/learner';
import { matching } from 'src/app/classes/matching';
import { book } from 'src/app/classes/book';

@Injectable({
  providedIn: 'root'
})
export class AddLearningService {
  addedBookToLearn:offer;
  allMatching:matching[];
 l= new learner("hh@gmail.com","111111",1,"")
  // [x: string]: any;
  constructor(private http: HttpClient) {
    sessionStorage.setItem("currentLearner","7")
  }
  getCurrentRequests(learnerId:number): Observable<Array<offer>> {
    return this.http.get<Array<offer>>(environment.BASIC_URL + "api/learner/getCurrentRequestsPerLearner/"+learnerId)
  }
  addLearning(m:matching):Observable<string>
  {
    return this.http.post<string>(environment.BASIC_URL+"api/learner/addLearningPost",m)
  }
  removeMatch(m:matching):Observable<string>
  {
    return this.http.delete<string>(environment.BASIC_URL+"api/matching/deleteMatch"+m)
  }
  getAllMatchings(){
    return this.http.get<Array<matching>>(environment.BASIC_URL+"api/matching/getAllMatchings").subscribe(success => { this.allMatching = success; }, error => { console.log(error); });
  }
  deleteMatchByDonorLearnerAndBook(donorId:string,learnerId:number,bookId:number):Observable<matching>{
    return this.http.get<matching>(environment.BASIC_URL+"api/matching/getMatchByDonorLearnerAndBook"+'/'+donorId+'/'+learnerId+'/'+bookId)
  }
}
