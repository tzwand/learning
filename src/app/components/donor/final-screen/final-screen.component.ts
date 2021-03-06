import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/request.service';
import { occupation } from '../../../classes/occupation';
import { donor } from '../../../classes/donor';


@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.css']
})
export class FinalScreenComponent implements OnInit {
  @Output() back = new EventEmitter();
  occupations: occupation[]
  private donor:donor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private req: RequestService,//נסרויס של הבקשה -כולל פונקציות שקשורות לבקשה

    

  ) {
    this.occupations = [];


  }
  ngOnInit() {
    this.donor = this.req.donor   //הפרטים של הבקשה בעצמה-מגיע מהתורם שבסרויס
    
    // this.req.getOccuptions()//מקבלים ישר מהסרויס רשימת זמנים
     var occupation=this.req.occupations.filter(o=>o.occuptionId==this.req.request.occuptionId)
     this.occupationName=occupation[0].occupationName;
console.log(this.req.request)
  }
  // next() {
  //   this.req.sendReq(this.donor)
  //   this.router.navigate(['/donor/2/3']);
  // }
  occupationName;

  next() {
    this.req.createReqs()
    this.router.navigate(['/donor/dashboard']);
  }
  prev(){
    this.back.emit(true);
  }
}
