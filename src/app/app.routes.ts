import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

export const routes: Routes = [
    { path: 'list', component: StudentListComponent},
    { path: 'student', component: StudentDetailsComponent},
    {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
    },
];
