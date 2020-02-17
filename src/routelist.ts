import { LoginComponent } from "./app/register/register/login/login.component";
import { LearnerScreenComponent } from "./app/components/learner/learner-screen/learner-screen.component";
import { DonorScreenComponent } from "./app/components/donor/donor-screen/donor-screen.component";
import { Component } from "@angular/core";
import { RegisterComponent } from "./app/register/register/register";
import { HomeComponent } from "./app/register/register/home";
import { TimeComponent } from "./app/components/donor/time/time.component";
import { GroupComponent } from "./app/components/donor/group/group.component";
import { PaymentsComponent } from "./app/components/donor/payments/payments.component";
import { FinalScreenComponent } from "./app/components/donor/final-screen/final-screen.component";
import { PurposeComponent } from "./app/components/donor/purpose/purpose.component";
import { AppComponent } from "./app/app.component";
import { NewLoginComponent } from "./app/components/login/new-login/new-login.component";
import { NewRegisterComponent } from "./app/components/login/new-register/new-register.component";
import { LearnerDashboardComponent } from './app/components/learner/learner-dashboard/learner-dashboard.component';
import { ResetPasswordComponent } from './app/components/login/reset-password/reset-password.component';
import { DonorDashboardComponent } from './app/components/donor/donor-dashboard/donor-dashboard.component';
import { LearenrsPerBookComponent } from './app/components/donor/dashboard/learenrs-per-book/learenrs-per-book.component';
import { DashboardBooksComponent } from './app/components/donor/dashboard/dashboard-books/dashboard-books.component';
import { DashboardLearnersComponent } from './app/components/donor/dashboard/dashboard-learners/dashboard-learners.component';
import { DashboardRequestsComponent } from './app/components/donor/dashboard/dashboard-requests/dashboard-requests.component';
import { LearnerDetailsComponent } from './app/components/donor/dashboard/learner-details/learner-details.component';
import { ProfileComponent } from './app/components/login/profile/profile.component';
import { VolunteerDashboardComponent } from './app/components/learner/volunteerLearner/volunteer-dashboard/volunteer-dashboard.component';
import { StartComponent } from './app/components/misc/start/start.component';

export const appNavigations = [
  { path: '', redirectTo: "/", pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'login/:type', component: NewLoginComponent },
  { path: 'resetPassword/:type', component: ResetPasswordComponent },
  { path: 'register/:type', component: NewRegisterComponent },

  {
    path: 'learner', component: LearnerScreenComponent,
    // children: [
    //   {
    //     path: 'learner/:email/:password/profile/',
    //     component: ProfileComponent,
    //   }

    // ]
  },
  { path: 'learner/dashboard', component: LearnerDashboardComponent },
  { path: 'learnersPerBook/:bookId', component: LearenrsPerBookComponent },
  {
    path: 'donor/dashboard', component: DonorDashboardComponent,
    children: [
      { path: 'books', component: DashboardBooksComponent },
      {
        path: 'learners', component: DashboardLearnersComponent,
        children: [
          { path: 'details/:learner', component: LearnerDetailsComponent }]
      },
      { path: 'requests', component: DashboardRequestsComponent }
    ]
  },

  {
    path: 'donor', component: DonorScreenComponent
  },

  { path: 'time', component: TimeComponent },
  { path: 'group', component: GroupComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'finalScreen', component: FinalScreenComponent },
  { path: 'purpose', component: PurposeComponent },
  { path: 'volunteer', component: VolunteerDashboardComponent },

  // { path: 'profile', component: ProfileComponent },
  { path: 'app', component: AppComponent },
  { path: 'profile', component: ProfileComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

  //     { path: '**', component: LoginComponent} ,
  //  { path: '',  redirectTo: "app", pathMatch:'full'}
]
