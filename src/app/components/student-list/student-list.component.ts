import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students!: Student[];
  constructor(private studentService: StudentService, private router: Router) { }

ngOnInit() {
  this.getStudents();
}

getStudents() {
  this.studentService.getStudents().subscribe(students => {
    this.students = students;
  });
}

onStudentSelected(student: Student) {
  this.router.navigate(['student'], { queryParams: { id: student.id } });
}



}
