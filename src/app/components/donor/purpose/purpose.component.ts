import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { donor } from '../../../classes/donor';
import { RequestService } from '../../../services/request/request.service';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css']
})
export class PurposeComponent implements OnDestroy, OnInit {

email : string
userName: string
donor:donor
purpose:string[]
purposeDesc:string
purposeList=[" "," "]
  constructor( private route: ActivatedRoute,
    private router: Router ,private req:RequestService) { }

  ngOnInit() {
    this.req.donor.email=sessionStorage.getItem('userEmail');
    this.req.donor.name=sessionStorage.getItem('donorName');
    this.email=this.req.donor.email;
    this.userName=this.req.donor.name;
    this.purpose=[" "," "];
    this.purposeList = this.req.getPurposes()
  }
  //פונקציה זו מתרחשת ברגע בו הקומפוננטה יורדת
  ngOnDestroy(): void {
   this.req.donor.reqPurpose=this.purpose+this.purposeDesc//מעדכן את הסרויס במטרה שהתורם מכניס כעת
  }
  onMenuItemSelected(event){
    //event -- string array of selected items
    console.log(event);
    for(let i=0;i<event.length;i++){
      console.log(event[i]);
    }
  }
next(){
  this.router.navigate(['/payments']);
}
}
