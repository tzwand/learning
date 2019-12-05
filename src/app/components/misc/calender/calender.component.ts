import { Component, OnInit, ViewChild } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { OptionsInput } from '@fullcalendar/core';
import heLocale from '@fullcalendar/core/locales/he';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Event } from '@angular/router';
import CalendarComponent from '@fullcalendar/core/CalendarComponent';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as $ from 'jquery';
import { CalendarServiceService } from 'src/app/services/calendarService/calendar-service.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LearnerEventDetailsComponent } from '../../learner/learner-event-details/learner-event-details.component';


@Component({
  selector: 'app-calender',

  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
@ViewChild ('myCalender') myCalender:FullCalendarComponent;
fileNameDialogRef: MatDialogRef<LearnerEventDetailsComponent>;
//  events:any
//  events1:any
 changeDaf= false;
//  eventsDafHayomei:any
 options:any
  title = 'myprime';
  dyBool;
// visibleEvents: any;
  /**
   *
   */
  constructor(private calService : CalendarServiceService,private dialog: MatDialog) {


  }
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin,bootstrapPlugin];
  themeSystem: 'bootstrap';
  ngOnInit(){
// this.events1=
//show all events
this.calService.loadDefaultEvents();
this.calService.showDafHayomei();
this.dyBool="הסתר";
this.calService.createServerEvents();
// this.visibleEvents=[this.events1,this.events];
this.options = {
  customButtons: {
    myCustomButton: {
      text: 'custom!',
    }
  }
};
// <p-schedule #cal [events]="events"
//                [header]="header"
//                [options]="options">
// </p-schedule>

// console.log(this.events);
// console.log(this.events1);

}

  dateClick(model)
  {

  alert(model.date)
  }
 a(m)
 {

   alert("olil");
 }


EventClick(e){
  debugger
 if(e.event.extendedProps.bookId!=null)
 this.openWindow(e);
  console.log(e);
if(e.event.id!="")
alert(e.event.id)
}
openWindow(e) {
  this.fileNameDialogRef = this.dialog.open(LearnerEventDetailsComponent,{
    hasBackdrop: true,
    data: {
      //the 'event' part of the object from the calender--it includes information about the event shown
      event: e.event
    }
  });
}
changeDafHayomei() {

   if(this.changeDaf==true)
   {
   this.calService.showDafHayomei();
   this.dyBool="הסתר";
   }
   else{
     this.calService.hideDafHayomei();
     this.dyBool="הצג";
   }


   this.changeDaf=!this.changeDaf;
// this.myCalender.eventSources=this.visibleEvents;

//  $('#calendar').fullCalendar('renderEvent', this.eventsDafHayomei, true);
 alert("ok")
//  $('#mycalender').fullCalendar( 'removeEvents');
//  $('#mycalender').fullCalendar('addEventSource', this.eventsDafHayomei);
}
}

