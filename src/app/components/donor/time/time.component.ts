import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { RequestService } from '../../../services/request/request.service';
import { Time } from '../../../classes/Time';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy {
from: Date;
until: Date;
times;
chosenTime

dateFormControl = new FormControl({
  start: new Date(Date.now()),
  end: new Date(Date.now()),
});

  constructor( private route: ActivatedRoute,
    private router: Router,
    private req:RequestService ) { }
ngOnDestroy()
{
  //retrieve the data from form control and update in server
  this.req.request.reqStartDate=this.dateFormControl.value.start;
  this.req.request.reqEndDate=this.dateFormControl.value.end;
}
  ngOnInit() {
    this.getTimes();
  }
  getTimes()
  {
  this.req.getTimes()//ניגש לפונקציה שלוקחת נתונים מהסרבר רק במידה שזוהי הפניה הראשונה, אחרת מחזיר את הנתונים שכבר יש לו .
  this.times = this.req.times;
      }
      lastDateChosen(event){
//emits when date changed in nb date picker
this.req.request.registerEndDate=event;

 //retrieve the data from form control and update in server --on destroy too late
 this.req.request.reqStartDate=this.dateFormControl.value.start;
 this.req.request.reqEndDate=this.dateFormControl.value.end;
      }
next(){
  this.router.navigate(['/group']);
}
rangeChosen(event)

{
  debugger
console.log(event);
}
//emits when multi select items are chosen
onMenuItemSelected(event){
  //event -- string  of selected item
  console.log(event);
 this.req.request.timeId=event;
}
}
