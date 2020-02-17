import { Component, OnInit } from '@angular/core';
import { AddLearningService } from '../../../services/addLearning/add-learning.service';
import { JsonPipe } from '@angular/common';
import { offer } from '../../../classes/offer';
import { Observable } from 'rxjs';
import { matching } from 'src/app/classes/matching';
import { NbWindowService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { ConfirmLearningComponent } from '../confirm-learning/confirm-learning.component';
import { DialogService } from 'primeng/api';
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter, delay, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common' 
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-learner-screen',
  templateUrl: './learner-screen.component.html',
  styleUrls: ['./learner-screen.component.css'],
  providers:[DatePipe]
})
export class LearnerScreenComponent implements OnInit {
  fileNameDialogRef: MatDialogRef<ConfirmLearningComponent>;
  data: any;
  cards: Array<any>
  m:matching;
  // [{"reqId":1004,"donorName":"avraham","donorEmail":"avra@gmail.com","reqPurpose":"להצלחת הפרויקט","BookId":2,"BookName":null,"timeId":2,"timeDesc":null,"reqStartDate":null,"reqEndDate":null,"sosDate":null,
  // "payment":0.0,"sosPayment":0.0,"occuptionId":null,"genderid":null,"password":"123456","extraInfo":null}]
  settings = {
    actions: {
      edit: false,
      add: false,
      columnTitle: 'הצטרף',
      position: 'left',
    },
  delete: {
    confirmDelete: true,

    deleteButtonContent: '<i class="nb-checkmark-circle" aria-hidden="true"></i>' ,
    saveButtonContent: 'שמור',
    cancelButtonContent: 'בטול'
  },
  add: {
    confirmCreate: true,
    addButtonContent: 'הוסף',
    createButtonContent: 'צור',
    cancelButtonContent: 'מחיקה',
  },
  // edit: {
  //   confirmSave: true,
  //   editButtonContent:'<i class="nb-heart" aria-hidden="true"></i>',
  //   saveButtonContent: 'שמור',
  //   cancelButtonContent: 'ביטול',
  // },
  columns: {
    // reqId: {
    //   title: 'קוד בקשה'
    // },
   
    // BookId: {
    //   title: 'קוד הספר'
    // },
        BookName: {
          title: 'שם הספר'
        },
     
        reqStartDate: {
          title: 'תאריך התחלה'
        },
        reqEndDate: {
          title: 'תאריך סיום',
        },
        registerEndDate: {
          title: 'תאריך סיום הרשמה',
        },
        timeDesc: {
          title: 'תדירות'
        },
        payment: {
          title: 'תשלום'
        },
        reqPurpose: {
          title: 'מוקדש ל:'
        },
        extraInfo: {
          title: 'מידע נוסף'
        }

      },
};





  // settings = {
  //   actions: {
  //     columnTitle: 'פעולות',
  //     position: 'right',
  //     add:true,
  //     edit:true,
  //     delete:true


  //   },

  //   add: {
  //     addButtonContent: 'הוסף',
  //     createButtonContent: 'צור',
  //     cancelButtonContent: 'מחיקה',
  //   },
  //   edit: {
  //     editButtonContent: 'עדכן',
  //     saveButtonContent: 'שמור',
  //     cancelButtonContent: 'ביטול',
  //   },
  //   delete: {
  //     deleteButtonContent: 'מחק',
  //   },


  //   columns: {
  //     BookName: {
  //       title: 'שם הספר'
  //     },
  //     extraInfo: {
  //       title: 'מידע נוסף'
  //     },
  //     reqStartDate: {
  //       title: 'תאריך התחלה'
  //     },
  //     reqEndDate: {
  //       title: 'תאריך סיום',
  //     },
  //     timeDesc: {
  //       title: 'תדירות'
  //     },
  //     payment: {
  //       title: 'סכום המילגה'
  //     },
  //     reqPurpose: {
  //       title: 'מוקדש ל:'
  //     }

  //   },
  //   mode:'external',
  //   noDataMessage:"לא נמצאו נתונים"
  // };
  offers: Array<offer>

show

  private readonly newProperty = this;
  addLearningBoolean: boolean;
  canContinue= false;

  // tslint:disable-next-line:max-line-length
  constructor(private datePipe: DatePipe,private dialog: MatDialog, private addService: AddLearningService,private windowService: NbWindowService,private dialogService:NbDialogService,private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
  this.show=false
this.data= new Array<any>()
    // this.route.params
    // .subscribe((paramsFromUrl: Params) => {
    //    console.log("paramsFromUrl!!!", paramsFromUrl);
    //    this.id = paramsFromUrl.id;
    //    this.name = paramsFromUrl.name;
    // });
    this.addService.getCurrentRequests(sessionStorage.getItem('learnerId') as unknown as number).subscribe(success => {  this.offers = (success),this.onSuccess()} )
  }

  onSuccess(){
    console.log(this.offers)
    if(this.offers[0]!=undefined){
    console.log("BookName:"+ this.offers[0].reqPurpose +"extraInfo:"+ this.offers[0].extraInfo)
    for (let i = 0; i < this.offers.length; i++) {
//gender and ocuupation id not a must becaue it is filtered to start with, obvieslt we dont show donor email and password...
      this.data.push
        ({
        
          //reqId:this.offers[i].reqId,         
          //BookId:this.offers[i].BookId,
          BookName: this.offers[i].BookName,
          reqPurpose: this.offers[i].reqPurpose,
          extraInfo: this.offers[i].extraInfo,
          

          reqStartDate: this.datePipe.transform(this.offers[i].reqStartDate, 'yyyy/MM/dd'), 
          registerEndDate:this.datePipe.transform(this.offers[i].registerEndDate, 'yyyy/MM/dd'),
          reqEndDate: this.datePipe.transform(this.offers[i].reqEndDate, 'yyyy/MM/dd'),

          timeDesc: this.offers[i].timeDesc,
          payment: this.offers[i].payment
        });
        this.show=true
    }
  }
  }
  onDeleteConfirm(event) {
    //alert("onDeleteConfirm");

    //the offer from the table to show and confirm
    this.addService.addedBookToLearn=event.data;
    console.log(event.data)
    console.log(sessionStorage["getItem(currentLearner)"])
     let req= event.data as offer
     console.log("req is:")
     console.log(req)

this.openWindow(event)

this.fileNameDialogRef
.afterClosed()
// .pipe(
//   filter(add => !add))

// .switchMap((add) => {
//   if (add) {
//       return Observable.of(canDeactivate);
//   }
//   else {
//       return Observable.of(window.confirm("message"));
//   })

.subscribe((add) =>{this.addLearningBoolean=add,this.canContinue=true,this.dealWithSubscribeConfirmLearning(event);

// this.m = new matching(sessionStorage.getItem('learnerId') as unknown as number,event.data.BookId,event.data.reqId);
// this.addService.addLearning(this.m).subscribe(success=>{console.log(success)});
// event.confirm.resolve();
}
  // (response) => { this.companiesModel = response; },
  // (err) => { console.log(err) },
  // (finally) => { console.log('finally') }
  );

//cant catch the subscribe
//delay(20000)

//an output srom the dialog--- with the user input whether or not to confirm the learning
// if(this.addLearningBoolean==true){
//  this.m = new matching(sessionStorage.getItem('learnerId') as unknown as number,event.data.BookId,event.data.reqId);
// this.addService.addLearning(this.m).subscribe(success=>{console.log(success)});
// event.confirm.resolve();
// }
// //cancel the whole event
// else {
//      event.confirm.reject();
//    }
 
//  console.log( this.addService.addLearning
  //   ( new matching ( sessionStorage.getItem("currentLearner") as unknown as number, req.BookId, 1005, 1 )).subscribe(success=>{console.log("i got it")}))
    //console.log(event);
   // if (window.confirm('Are you sure you want to delete?')) {
      
    //} 
  }
  dealWithSubscribeConfirmLearning(event) {
    if(this.addLearningBoolean==true){
      this.m = new matching(sessionStorage.getItem('learnerId') as unknown as number,event.data.BookId,event.data.reqId);
     this.addService.addLearning(this.m).subscribe(success=>{console.log(success), event.confirm.resolve();});
    
     }
     //cancel the whole event
     else {
          event.confirm.reject();
        }
  }

  onCreateConfirm(event) {
    alert("onCreateConfirm")
    console.log("Create Event In Console")
   
    event.confirm.resolve();

  }

  navToCalander(){
    this.router.navigate(['learner/dashboard']);
  }
  navToProfile( )
  {
    this.router.navigate(['profile']);
  }

  onSaveConfirm(event) {
    alert("onSaveConfirm")
    console.log("Edit Event In Console")
    console.log(event);
    event.confirm.resolve();
  }
  openWindow(event) {
    // const context = { text: "hi" };
    // this.windowService.open(ConfirmLearningComponent, { title: 'Window with context', context });
    // const dialogRef = this.dialogService.open(ConfirmLearningComponent,{  context :event.data });
    this.fileNameDialogRef = this.dialog.open(ConfirmLearningComponent,{
      hasBackdrop: true,
      data: {
        event: event ? event.data : ''
      }
    });
  }
  // myCreate(add){
  //   console.log(add.index);
  // }
}