import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://44.217.66.58:8080/students';

  constructor(private http: HttpClient) { }
  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentDetails(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + '/' + id);
  }

}
