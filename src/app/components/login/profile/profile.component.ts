import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { donor } from 'src/app/classes/donor';
import { learner } from 'src/app/classes/learner';
import { FormControl, Validators } from '@angular/forms';
import { occupation } from 'src/app/classes/occupation';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEmail: string
  userName: string
  userPassword: string
  type: string;
  viewOccupations = [];
  occupations: occupation[];
  constructor(private userService: UserService, private req: RequestService) { }


  ngOnInit() {
    this.min = new Date(Date.now())
    this.max = new Date(Date.now())
    this.occupations = []
    this.userEmail = sessionStorage.getItem('userEmail');

    this.userPassword = sessionStorage.getItem('userPassword')
    this.type = sessionStorage.getItem('userType');

    if (this.type == 'donor') {
      this.userName = sessionStorage.getItem('donorName')
    }
    else if (this.type == 'learner') {
      //initialize var
      this.userName = sessionStorage.getItem('learnerName');
      this.learnerToEdit = new learner(this.userEmail, this.userPassword, sessionStorage.getItem("learnerId"), this.userName);
      this.req.getOccuptions().subscribe((success) => { this.occupations = success; })
    }
  }
  donorToEdit: donor;
  learnerToEdit: learner;
  dateFormControl = new FormControl({
    start: [new Date(Date.now())],
    end: [new Date(Date.now())],
  });
  min: Date
  max: Date
  ngModelDate = {
    start: new Date(),
    end: new Date(),
  };
  //  parseDate(input) {
  //   var parts = input.match(/(\d+)/g);
  //   // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  //   return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  // }
  saveChanges() {
    //validation
    if(this.dateFormControl.value.end < Date.now())
      alert(this.dateFormControl.value.end)
    if (this.type == "donor") {
      this.donorToEdit = new donor(this.userEmail, this.userPassword, this.userName);
      this.userService.updateDonor(this.donorToEdit).subscribe(success => { console.log(success), sessionStorage.setItem('donorName', this.userName); }, error => console.log(error));
    }
    else {


      //set extra information for learner
      this.learnerToEdit.startDate = (this.ngModelDate.start);
      this.learnerToEdit.endDate = (this.ngModelDate.end);

      this.userService.updateLearner(this.learnerToEdit).subscribe(success => { console.log(success), sessionStorage.setItem('learnerName', this.userName); }, error => console.log(error));
    }
    sessionStorage.setItem('userEmail', this.userEmail);
    sessionStorage.setItem('userName', this.userName);
    sessionStorage.setItem('userPassword', this.userPassword);

  }
  mychange(num) {
    if (num == 0)
      if (this.viewOccupations.find(x => x.gender == "male") == undefined) {
        this.viewOccupations = this.viewOccupations.concat(this.occupations.filter(v => v.gender == "male"))
        this.learnerToEdit.gender = "0";
      }
    if (this.viewOccupations.find(x => x.gender == "female") == undefined)

      if (num == 1) {
        this.viewOccupations = this.viewOccupations.concat(this.occupations.filter(v => v.gender == "female"))
        this.learnerToEdit.gender = "1";
      }
    if ((this.viewOccupations.find(x => x.gender == "male") == undefined) || (this.viewOccupations.find(x => x.gender == "female") == undefined))

      if (num == 2) {
        this.viewOccupations = this.occupations
        this.learnerToEdit.gender = "2";
      }
  }
  onMenuItemSelected(event) {

    //event --  selected item

    this.learnerToEdit.occuptionName = event

  }
}
