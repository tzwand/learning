import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/request.service';
import { occupation } from '../../../classes/occupation';
import * as $ from 'jquery'
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit {
  @Output() continue = new EventEmitter();
  @Output() back = new EventEmitter();
  uploadedFiles: any[] = [];
  genders: string[] = ['זכר', 'נקבה', 'לא משנה'];
  constructor(private route: ActivatedRoute,
    private router: Router, private req: RequestService) { }
  selected: string;
  viewOccupations=[];
 
  ngOnInit() {
   
  
    

  //fill the occupation list in server
  this.req.setOccupationList();

 
   
  
 
  
    
  
  }
   parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }
 
  getOccupations() {
    // this.Occupations = this.req.getOccuptions()
  }
  onMenuItemSelected(event){
   debugger
    //event --  selected item
    // this.req.request= $("#dropDownId").children("option").filter(":selected").val() 
         this.req.request.occuptionId=event

    
  }
  mychange(num) {
     if (num == 0)
     if(this.viewOccupations.find(x=>x.gender=="male")==undefined)
     {
      this.viewOccupations = this.viewOccupations.concat(this.req.occupations.filter(v => v.gender == "male"))
      this.req.request.genderId="0";
     }
      if(this.viewOccupations.find(x=>x.gender=="female")==undefined)
      
      if (num == 1)
      {
      this.viewOccupations = this.viewOccupations.concat(this.req.occupations.filter(v => v.gender == "female"))
      this.req.request.genderId="1";
      }
      if((this.viewOccupations.find(x=>x.gender=="male")==undefined)||(this.viewOccupations.find(x=>x.gender=="female")==undefined))
      
      if (num == 2)
      {
      this.viewOccupations = this.req.occupations
      this.req.request.genderId="2";
      }
      
  }


 


  
  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        console.log(this.uploadedFiles)
    }
  }
  next(){
    this.continue.emit(true);
   
  }
  prev(){
    this.back.emit(true);
   
  }
}
