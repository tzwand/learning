import { Component, OnInit, Input } from '@angular/core';
import { learner } from 'src/app/classes/learner';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-learner-details',
  templateUrl: './learner-details.component.html',
  styleUrls: ['./learner-details.component.css']
})
export class LearnerDetailsComponent implements OnInit {
  @Input() learner: learner;

  constructor( private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    // this.route.params
    // .subscribe((paramsFromUrl: Params) => {
    //   console.log('paramsFromUrl!!!', paramsFromUrl);
    //   this.learner = paramsFromUrl.learner;
    // });
  }

}
