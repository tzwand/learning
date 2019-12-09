import { Injectable } from '@angular/core';
import { book } from 'src/app/classes/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarServiceService {
public  visibleEvents=[];
categories: book[];
eventId=0;
  catCount;
  colorNewEvent='purple';
events= {
    // url:"https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&m=50&s=on",
    url:"https://www.hebcal.com/hebcal/?v=1&cfg=fc&maj=on&min=on&nx=on&mf=on&ss=on&o=on&s=on&i=on&year=2019&month=x&yt=G&lg=h&d=on&c=on",
    // url: "https://www.hebcal.com/hebcal/?v=1&cfg=fc&maj=on&min=on&mod=off&nx=off&month=x&ss=on&mf=off&c=off&geo=none&lg=ah&d=on",
    cache: true,
    textColor: 'blue',
    color:'transparent',
    selectable:false

}
eventsDafHayomei = {

  url:"https://www.hebcal.com/hebcal/?v=1&cfg=fc&F=on&i=on&year=2019&month=x&yt=G&lg=h&c=off&geo=geoname&zip=&city=&geonameid=&b=18&m=50&.s",

  cache: true,
  textColor: 'lightblue',
  color:'transparent',
  selectable:false

}
events1= {
  url: "http://localhost:62299/api/learner/GetCurrentLearningDates/"+sessionStorage.getItem('learnerId'),
  cache: true,
  color: 'lightgray',   // an option!
  textColor: 'black',
  borderColor:'blue',
  allDay: true
}
eventSourceToAdd= {
  id:this.eventId,
  url: '',
  cache: true,
  color: 'lightgray',   // an option!
  textColor: this.colorNewEvent,
  borderColor:this.colorNewEvent,
  allDay: true,
  extendedProps: {
    learningEvent: true
  }
}

  constructor(private http: HttpClient) {
   
   }
  loadDefaultEvents(){
    this.visibleEvents=this.visibleEvents.concat(this.events);
  }
  showDafHayomei(){
  

 this.visibleEvents = this.visibleEvents.concat(this.eventsDafHayomei);
  }
  hideDafHayomei(){
    this.visibleEvents = this.visibleEvents.filter(obj => obj !== this.eventsDafHayomei);
  }
  getCategories(): Observable<Array<book>> {
    return this.http.get<Array<book>>(environment.BASIC_URL + 'api/learner/GetCategories');
  }
  getColorForCategory(category:string): Observable<string> {
    var url=environment.BASIC_URL + 'api/learner/getColorForCategory/'+category;
    return this.http.get(url, {responseType: 'text'});
  }

  createServerEvents(){
    debugger
    delay(4000)
  this.getCategories().subscribe(success=>{this.categories =success, this.catCount = this.categories.length,this.onGetCategoriesSuccess();}
    ,err=>{console.error(err)});

}
onGetCategoriesSuccess(){
  for (let i=0;i<this.catCount;i++)
  {
 var color;
this.getColorForCategory(this.categories[i].BookName).subscribe(success=>{this.colorNewEvent=success ,this.addEventSource(i);}
  ,err=>{console.error(err)});
}
}

addEventSource(bookNum)
{
  debugger
  this.eventSourceToAdd= {
    id: this.eventId++,
    url: "http://localhost:62299/api/learner/GetCurrentLearningDatesByCategory/"+sessionStorage.getItem('learnerId')+'/'+this.categories[bookNum].BookId,
    cache: true,
    color: 'lightgray',
    textColor: this.colorNewEvent,
    borderColor:this.colorNewEvent,
    allDay: true, 
     extendedProps: {
      learningEvent: true
    }
    }
    this.visibleEvents = this.visibleEvents.concat(this.eventSourceToAdd);
  // this.visibleEvents.push(this.eventSourceToAdd);
}
}

