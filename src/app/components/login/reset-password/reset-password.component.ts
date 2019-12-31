import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { learner } from 'src/app/classes/learner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private service: UserService) { }
email;
startMonth
startYear
type
  ngOnInit() {
    //get the type  learner or donor param from url
    this.route.params
    .subscribe((paramsFromUrl: Params) => {
      console.log('paramsFromUrl!!!', paramsFromUrl);
      this.type = paramsFromUrl.type;
    });

  }
  resetPassword(){

    this.service.resetPasswordByEmail(this.type==1?"donor":"learner",this.email)
      .subscribe((success) => {
        if(success!="")
        alert(" הסיסמא נשלחה בהצלחה"),
         this.router.navigate(["/login/"+0]);
      }
        , (error) => { console.log("It's a problem - " + error.massage) })
    }

    // this.service.resetPassword(sessionStorage.getItem('userType'),sessionStorage.getItem('userEmail'),this.startMonth,this.startYear)
    //   .subscribe((success) => {
    //     if(success!="")
    //     alert(" הסיסמא נשלחה בהצלחה"),
    //     // this.router.navigate(["/login/"+sessionStorage.getItem('userType')])
    //      this.router.navigate(["/login/"+0]);
    //     // this.router.navigate(['/login/']);
    //   }
    //     , (error) => { console.log("It's a problem - " + error.massage) })
      //  }
}
