import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentService } from './student.service';
import { Student } from '../models/student';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService]
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  // Tu prueba original preservada
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Nueva prueba ajustada para getStudents
  it('should retrieve students from the API via GET', () => {
    const mockStudents: Student[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];

    service.getStudents().subscribe(students => {
      expect(students).toEqual(mockStudents);
    });

    const req = httpMock.expectOne('http://ip172-18-0-9-csvu6fqim2rg00fi63v0-8080.direct.labs.play-with-docker.com/students');
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents); // Simula la respuesta del servidor
  });

  // Otra prueba: Obtener detalles de un estudiante
  it('should retrieve student details from the API via GET', () => {
    const mockStudent: Student = { id: 1, name: 'John Doe' };

    service.getStudentDetails(1).subscribe(student => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne('http://ip172-18-0-9-csvu6fqim2rg00fi63v0-8080.direct.labs.play-with-docker.com/students/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockStudent); // Simula la respuesta del servidor
  });
});
