import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';
import { learner } from 'src/app/classes/learner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-learners',
  templateUrl: './dashboard-learners.component.html',
  styleUrls: ['./dashboard-learners.component.css']
})
export class DashboardLearnersComponent implements OnInit {

  showDetails=false;
  toggleShow="הצג";
  numOfActiveLearnings: number;

  constructor(private req:RequestService,private route: ActivatedRoute,
    private router: Router) { }
  learners = [];

  ngOnInit() {
    this.req.getLearnersFordonor(sessionStorage.getItem('userEmail').slice(0,-4)).subscribe
    (success => {this.learners = success as learner[],console.log(this.learners) ;},
       error => {console.log(error); });
  }
  toggleShowDetails()
{
  if(this.showDetails==true)
  {
  this.showDetails=false;
  this.toggleShow="הצג";
  }
  else{
    this.showDetails=true;
    this.toggleShow="הסתר";
  }
}
getMessage(message: number) {
  this.numOfActiveLearnings = message;
  console.log(this.numOfActiveLearnings+"numOfActiveLearning")
}

}
