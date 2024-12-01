import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://ip172-18-0-9-csvu6fqim2rg00fi63v0-8080.direct.labs.play-with-docker.com/students';

  constructor(private http: HttpClient) { }
  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentDetails(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + '/' + id);
  }

}
