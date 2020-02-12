import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  
  data: { id: number; name: string; username: string; email: string; }[];
  cards: string[]
  kind: number = 5
  userToDisplay=""
  userTitleToDisplay=""
init=false;
  constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private searchService: NbSearchService) {
    // this.searchService.onSearchSubmit()
    // .subscribe((data: any) => {
    //   this.value = data.term;
    // })
   }
  
   title = 'learning';
   tabs = [
     {
       title: 'לומד',
       route: '/login/0',
 
       responsive: true, // hide title before `route-tabs-icon-only-max-width` value
     },
     {
       title: 'יזם',
       route: '/login/1',
     }
   ];
   navDashboardlink='';
   items = [{ title: 'פרופיל', link: '/profile' },
   { title: 'יציאה', link: '/login/1' }];
 
    itemsLearner= [
     {
       title: 'עמוד הבית',
      link: 'learner/dashboard'
       // link: sessionStorage.getItem('userType') =='learner'? 'learner/dashboard':'donor/dashboard'
     },
     {
       title: 'יציאה',
       link: '/'
     }
    ];
 
    itemsDonor= [
     {
       title: 'עמוד הבית',
      link: 'donor/dashboard'
       // link: sessionStorage.getItem('userType') =='learner'? 'learner/dashboard':'donor/dashboard'
     },
     {
       title: 'יציאה',
       link: '/'
     }
    ];
   sidebarItems;
  ngOnInit(): void {
  
   this.init=true;
    this.userTitleToDisplay=sessionStorage.getItem('userType');
     this.sidebarItems=this.userTitleToDisplay=="donor"?this.itemsDonor:this.itemsLearner;
    this.navDashboardlink=this.userTitleToDisplay+'/dashboard';
this.userToDisplay=sessionStorage.getItem('userEmail') ? sessionStorage.getItem('userEmail'): ""
  }
  login(num: number) {
 
    this.router.navigate(['login/' + num]);
  }

}