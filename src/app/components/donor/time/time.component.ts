import { Component, OnInit } from '@angular/core';
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
export class TimeComponent implements OnInit {
from: Date;
until: Date;
times;
chosenTime

dateFormControl = new FormControl({
  start: new Date(2019, 2, 1),
  end: new Date(2019, 2, 20),
});


  constructor( private route: ActivatedRoute,
    private router: Router,
    private req:RequestService ) { }

  ngOnInit() {
    this.from=new Date(Date.now());
    this.until=new Date(Date.now());
    this.getTimes();
  }
  getTimes()
  {
    debugger
  this.req.getTimes()//ניגש לפונקציה שלוקחת נתונים מהסרבר רק במידה שזוהי הפניה הראשונה, אחרת מחזיר את הנתונים שכבר יש לו .
  this.times = this.req.times;
      }
next(){
  this.router.navigate(['/group']);
}
onMenuItemSelected(event){
  //event -- string array of selected items
  console.log(event);
  for(let i=0;i<event.length;i++){
    console.log(event[i]);
  }
}
}
