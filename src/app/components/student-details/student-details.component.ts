import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
  providers: [StudentService]
})
export class StudentDetailsComponent {
  student!: Student;
  id!: number;

  constructor(private activatedRoute: ActivatedRoute,private studentService: StudentService, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.getStudentDetails();
      } else {
        console.error('El ID no se obtuvo correctamente');
      }
    });
  }
  
  getStudentDetails(){
    this.studentService.getStudentDetails(this.id).subscribe(student => {
      this.student = student;
    });
  }
}
