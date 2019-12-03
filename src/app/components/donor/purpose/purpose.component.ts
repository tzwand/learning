import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { donor } from '../../../classes/donor';
import { RequestService } from '../../../services/request/request.service';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css']
})
export class PurposeComponent implements OnDestroy, OnInit {
  @Output() continue = new EventEmitter();
email : string
userName: string
donor:donor
purpose=""
purposeDesc:string
purposeList=[" "," "]
  constructor( private route: ActivatedRoute,
    private router: Router ,private req:RequestService) { }

  ngOnInit() {
    //display user info
    this.req.donor.email=sessionStorage.getItem('userEmail');
    this.req.donor.name=sessionStorage.getItem('donorName');
    this.email=this.req.donor.email;
    this.userName=this.req.donor.name;
    //fill the multi select with info
    this.purposeList = this.req.getPurposes()
  }
  //פונקציה זו מתרחשת ברגע בו הקומפוננטה יורדת
  ngOnDestroy(): void {
    //the purposes + extra info
   this.req.request.reqPurpose=this.purpose+' '+ this.purposeDesc//מעדכן את הסרויס במטרה שהתורם מכניס כעת
   console.log(this.req.request)
  }
  onMenuItemSelected(event){
    this.purpose=""
    //event -- string array of selected items
    for(let i=0;i<event.length;i++){
      // all the purposes for req are added
      if(i!=0)
      this.purpose+=', ';
      this.purpose+= event[i];
    }
  }
  next(){
  // this.req.request.reqPurpose=this.purpose+' '+ this.purposeDesc

  // this.router.navigate(['/payments']);
  this.continue.emit(true);

  
}
}
