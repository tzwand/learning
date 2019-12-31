import { Injectable } from '@angular/core';
import {person } from '../../classes/person';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { learner } from '../../classes/learner';
import { environment } from '../../../environments/environment';
import { donor } from '../../classes/donor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser;
  currentDonor:donor;
  currentLearner:learner;
isVolunteer;
  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<Array<learner>> {
    return this.http.get<Array<learner>>(environment.BASIC_URL + "getAll");
  }
  getLearner(email: string,password:string): Observable<learner> {
    return this.http.post<learner>(environment.BASIC_URL + "api/user/findLearnerByEmailAndPassword" ,[email,password]);
  }
  getDonor(email: string,password:string): Observable<donor> {
    return this.http.post<donor> (environment.BASIC_URL + "api/user/findDonorByEmailAndPassword" ,[email,password]);
  }
  addLearner(name: string,email:string): Observable<learner> {
    return this.http.post<learner>(environment.BASIC_URL + "api/user/addLearner",[name,email]);
  }
  addDonor(name: string,email:string): Observable<Array<person>> {
    return this.http.post<Array<person>>(environment.BASIC_URL + "api/user/addDonor", [name,email]);
  }
  resetPassword(type:string,email:string, startMonth:string,startYear:string): Observable<string>{
    return this.http.post<string>(environment.BASIC_URL + "api/user/resetPasswordPost", [type,email,startMonth,startYear]);
  }
  resetPasswordByEmail(type:string,email:string): Observable<string>{
    return this.http.post<string>(environment.BASIC_URL + "api/user/resetPasswordPostByEmail", [type,email]);
  }

  deleteperson(p: person): Observable<Array<person>> {
    return this.http.delete<Array<person>>(environment.BASIC_URL + "Delete/" + p);
  }

  updateperson(p: person) {
    return this.http.put<Array<person>>(environment.BASIC_URL + "Put", p);
  }
  updateLearner(l: learner) {
    return this.http.put<Array<person>>(environment.BASIC_URL + "api/user/PutLearner", l);
  }
  updateDonor(d: donor) {
    return this.http.put<Array<person>>(environment.BASIC_URL + "api/user/PutDonor", d);
  }
  isLearnerVolunteer(l:learner){
if (l.groupId!=undefined)
this.isVolunteer=true;
this.isVolunteer=false;
  }

}
