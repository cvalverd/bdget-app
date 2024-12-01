import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDetailsComponent } from './student-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Student } from '../../models/student';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    const activatedRouteMock = {
      queryParams: of({ id: 123 }) // Simula un parámetro de consulta con ID=123
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StudentDetailsComponent], // Importa el componente standalone
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock } // Mock de ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); // Controlador de pruebas HTTP
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the student ID from queryParams in ngOnInit', (done) => {
    component.ngOnInit();

    setTimeout(() => {
      expect(component.id).toBe(123); // Verifica que el ID fue asignado correctamente
      done();
    });
  });

  it('should call getStudentDetails when ID is present in queryParams', (done) => {
    component.ngOnInit();

    const expectedUrl = 'http://ip172-18-0-9-csvu6fqim2rg00fi63v0-8080.direct.labs.play-with-docker.com/students/123';
    const mockStudent = { id: 123, name: 'Juan Perez' } as Student;

    const req = httpTestingController.expectOne(expectedUrl); // Verifica la URL
    expect(req.request.method).toBe('GET');
    req.flush(mockStudent); // Simula la respuesta del servidor

    setTimeout(() => {
      expect(component.student).toEqual(mockStudent); // Verifica que los datos se asignaron correctamente
      done();
    });
  });

  it('should set the student data returned by the service in getStudentDetails', (done) => {
    component.ngOnInit();

    const expectedUrl = 'http://ip172-18-0-9-csvu6fqim2rg00fi63v0-8080.direct.labs.play-with-docker.com/students/123';
    const mockStudent = { id: 123, name: 'Juan Perez' } as Student;

    const req = httpTestingController.expectOne(expectedUrl); // Verifica la URL
    expect(req.request.method).toBe('GET');
    req.flush(mockStudent); // Simula la respuesta del servidor

    setTimeout(() => {
      expect(component.student).toEqual(mockStudent); // Verifica que los datos se asignaron correctamente
      done();
    });
  });
});
