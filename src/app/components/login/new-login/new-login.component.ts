import { Component, OnInit } from '@angular/core';
import { person } from '../../../classes/person';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { AddLearningService } from '../../../services/addLearning/add-learning.service';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private router: Router, private service: UserService) { }


  newperson: person;
  type: any;
  goRegister:boolean=false
  // temp = "";
  ngOnInit() {
    this.newperson = new person('');
    this.route.params
      .subscribe((paramsFromUrl: Params) => {
        console.log('paramsFromUrl!!!', paramsFromUrl);
        this.type = paramsFromUrl.type;
      });
  }
  
  saveForm() {
    debugger
    sessionStorage.setItem('userEmail', this.newperson.email);
    sessionStorage.setItem('userPassword', this.newperson.password);
    // this.temp = "";
    if (this.type == 1) {
    sessionStorage.setItem('userType', 'donor');
    sessionStorage.setItem('userPassword', this.newperson.password);
      this.service.getDonor(this.newperson.email, this.newperson.password)
        .subscribe(success => {
        if (success != null) { this.router.navigate(['/donor/dashboard']),
        sessionStorage.setItem('donorEmail', success.donorEmail),
        sessionStorage.setItem('donorName',success.donorName),
        console.log(success);
        }
         else { this.goRegister = true; } }
          , error => { console.log('It\'s a problem - ' + error.massage); });
        }
         else if (this.type == 0) {
      sessionStorage.setItem('userType', 'learner');
      this.service.getLearner(this.newperson.email, this.newperson.password)
        .subscribe(success => {
        if (success != null) {
          //if he is a volunteer set the right parameter in service
          this.service.isLearnerVolunteer(success);
        this.router.navigate(['/learner/dashboard']);
       sessionStorage.setItem('learnerName', success.learnerName);
       sessionStorage.setItem('learnerId', success.learnerId as unknown as string);
        } else { this.goRegister = true; }}
          , error => { console.log('It\'s a problem - ' + error.massage); });
      }
    this.newperson = new person();
  }
  resetPassword() {

    this.router.navigate(['/resetPassword/'+this.type]);
      }
  register() {
    this.router.navigate(['/register/' + this.type]);
  }
}
