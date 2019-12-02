import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { donor } from 'src/app/classes/donor';
import { learner } from 'src/app/classes/learner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userEmail:string
userName:string
userPassword:string
type:string;
  constructor( private userService:UserService) { }

  ngOnInit() {
     this.userEmail=sessionStorage.getItem('userEmail');
    
     this.userPassword=sessionStorage.getItem('userPassword')
     this.type=sessionStorage.getItem('userType');
    if (this.type == 'donor') {
     this.userName= sessionStorage.getItem('donorName')
    }
     else if (this.type =='learner') {
        this.userName=sessionStorage.getItem('learnerName');      
  }

}
donorToEdit:donor;
learnerToEdit:learner;
saveChanges(){
if(this.type=="donor")
{
this.donorToEdit= new donor(this.userEmail,this.userPassword,this.userName);
this.userService.updateDonor(this.donorToEdit).subscribe(success=>{console.log(success), sessionStorage.setItem('donorName',this.userName);},error=>console.log(error));
}
else
{
this.learnerToEdit= new learner(this.userEmail,this.userPassword,sessionStorage.getItem("learnerId"),this.userName);
this.userService.updateLearner(this.learnerToEdit).subscribe(success=>{console.log(success), sessionStorage.setItem('learnerName',this.userName);},error=>console.log(error));
}
  sessionStorage.setItem('userEmail',this.userEmail);
    sessionStorage.setItem('userName',this.userName);
    sessionStorage.setItem('userPassword',this.userPassword);
   
}
}
