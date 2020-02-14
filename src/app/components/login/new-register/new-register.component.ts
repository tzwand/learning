import { Component, OnInit, ViewChild } from '@angular/core';
import { person } from '../../../classes/person';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { occupation } from 'src/app/classes/occupation';
import { RequestService } from 'src/app/services/request/request.service';
import { FormControl, Validators } from '@angular/forms';
import { learner } from 'src/app/classes/learner';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common' 

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css'],

})
export class NewRegisterComponent implements OnInit {
constructor( private route: ActivatedRoute,
private router: Router,private service: UserService,private req:RequestService) { }
rangeDates: Date[];
newperson: person;
type: any;
temp="";
dateFormControl = new FormControl({
  start:[new Date(Date.now()),Validators.required],
  end: [new Date(Date.now()),Validators.required],
});
ngModelDate = {
  start: new Date(),
  end: new Date(),
};
  ngOnInit() {
    this.service.currentLearner= new learner("","","","");
    this.req.getOccuptions().subscribe((success)=>{ this.occupations= success;
    }
    )
    this.newperson = new person("");
    this.route.params
      .subscribe((paramsFromUrl: Params) => {
        console.log("paramsFromUrl!!!", paramsFromUrl)
        this.type = paramsFromUrl.type;
      });
  }
 saveForm(){
  if (this.type == 1)
 {
  this.service.addDonor(this.newperson.name , this.newperson.email)
    .subscribe(success => {  
   
      alert("נשלחת סיסמא במייל ההרשמה ~~ בהצלחה")
     this.router.navigate(['/login/'+this.type]);
   
    }
      , error => { console.log("It's a problem - " + error.massage) })
  }
else if (this.type == 0){

 this.service.currentLearner.email=this.newperson.email;
 this.service.currentLearner.name= this.newperson.name;
  this.service.addLearnerWithDetails
  ( this.service.currentLearner)
    .subscribe(success => { 
      alert("ההרשמה הסתיימה בהצלחה")
      this.router.navigate(['/login/'+this.type]);
  
    }
      , error => { console.log("It's a problem - " + error.massage) })
  }
  
 
  // this.service.currentLearner.startDate=this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd HH:mm:ss.SSS');
  
  // this.service.currentLearner.endDate=this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd HH:mm:ss.SSS');

  this.service.currentLearner.startDate=(this.ngModelDate.start);
  this.service.currentLearner.endDate=(this.ngModelDate.end);
  debugger

  //the create function only puts the basic information about the learner
  //update the extra information
  this.service.updateLearner(this.service.currentLearner)
this.newperson = new person();
    }
    learner;
    viewOccupations=[];
    occupations: occupation[];
    mychange(num) {
      if (num == 0)
      if(this.viewOccupations.find(x=>x.gender=="male")==undefined)
      {
       this.viewOccupations = this.viewOccupations.concat(this.occupations.filter(v => v.gender == "male"))
       this.service.currentLearner.gender="0";
      }
       if(this.viewOccupations.find(x=>x.gender=="female")==undefined)
       
       if (num == 1)
       {
       this.viewOccupations = this.viewOccupations.concat(this.occupations.filter(v => v.gender == "female"))
       this.service.currentLearner.gender="1";
       }
       if((this.viewOccupations.find(x=>x.gender=="male")==undefined)||(this.viewOccupations.find(x=>x.gender=="female")==undefined))
       
       if (num == 2)
       {
       this.viewOccupations = this.occupations
       this.service.currentLearner.gender="2";
       }
    } 
    onMenuItemSelected(event){
   
      //event --  selected item
    
           this.service.currentLearner.occuptionId=event
      
    }

}


