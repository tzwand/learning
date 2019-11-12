import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';
import { offer } from 'src/app/classes/offer';

@Component({
  selector: 'app-dashboard-requests',
  templateUrl: './dashboard-requests.component.html',
  styleUrls: ['./dashboard-requests.component.css']
})
export class DashboardRequestsComponent implements OnInit {
reqs:offer[];
reqsReady=false;
  constructor(private req:RequestService) { }

  ngOnInit() {
    this.req.getReqsByDonor(sessionStorage.getItem('userEmail').slice(0,-4)as unknown as number).subscribe
    (success => {this.reqs = success as offer[],console.log(this.reqs) ,this.reqsReady=true;},
       error => {console.log(error); });
  }

}
