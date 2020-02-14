import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { RequestService } from '../../../services/request/request.service';
import { Time } from '../../../classes/Time';
import { FormControl, Validators } from '@angular/forms';
import { NbStepperComponent } from '@nebular/theme';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy {
  @Output() continue = new EventEmitter();
  @Output() back = new EventEmitter();
rangeDates: Date[];
from: Date;
until: Date;
times;
chosenTime

dateFormControl = new FormControl({
  start:[new Date(Date.now()),Validators.required],
  end: [new Date(Date.now()),Validators.required],
});
  invalidDateAlert: boolean;

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
        debugger
//emits when date changed in nb date picker

 //retrieve the data from form control and update in server --on destroy too late
 this.req.request.reqStartDate=this.rangeDates[0];
 this.req.request.reqEndDate=this.rangeDates[1];
debugger
 this.invalidDateAlert=false;
//check that the last register date is before the learnung start date
if(event>this.req.request.reqStartDate)
//show an alert 
this.invalidDateAlert=true;
else
this.req.request.registerEndDate=event;


      }
next(){
  if(!this.invalidDateAlert)
  this.continue.emit(true);
  // this.router.navigate(['/group']);
}
prev(){
 
  this.back.emit(true);
 
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
 this.req.request.timeDesc=event;
}
}
