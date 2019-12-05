import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NbStepperComponent } from '@nebular/theme';
@Component({
  selector: 'app-donor-screen',
  templateUrl: './donor-screen.component.html',
  styleUrls: ['./donor-screen.component.css']
})
export class DonorScreenComponent implements OnInit {
  @ViewChild('stepper') stepper: NbStepperComponent;
  constructor( private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
newl(){
  this.router.navigate(['/purpose']);
}
nextStep(event){
  if(event==true)
  {
    this.stepper.next();
  }
 
  }

stepBack(event){
  if(event==true)
{
  this.stepper.previous();
}
}
}
