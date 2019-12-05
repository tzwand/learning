import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/request/request.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @Output() continue = new EventEmitter();
  @Output() back = new EventEmitter();
sum:number;
// sosTime:Date;
// sosSum:number=0;
// sos: boolean;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private req:RequestService) { }

  ngOnInit() {
  //ניגש לסרויס כדי לקבל את הסכום המקובל
this.req.getRegularSum().subscribe(success=>{this.sum=success },err=>{console.error(err) });

//  this.sosTime= null
// this.sosSum=0;
// this.sos= false;
  }
  dateChosen(event){
this.req.request.sosDate=event;
  }

next(){
  this.continue.emit(true);
  // this.router.navigate(['/time']);
}
prev(){
  this.back.emit(true);
  // this.router.navigate(['/time']);
}
}
