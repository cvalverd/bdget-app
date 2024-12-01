import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Student } from '../../models/student';
import { StudentListComponent } from './student-list.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { StudentService } from '../../services/student.service';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockStudentService: jasmine.SpyObj<StudentService>;

  beforeEach(async () => {
    // Mock del Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // Mock del Servicio de Estudiantes
    mockStudentService = jasmine.createSpyObj('StudentService', ['getStudents']);
    mockStudentService.getStudents.and.returnValue(of([])); // Retorno por defecto

    await TestBed.configureTestingModule({
      imports: [StudentListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: StudentService, useValue: mockStudentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    // Nota: No se llama a fixture.detectChanges() aquí
  });

  // Prueba de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba del método onStudentSelected
  it('should navigate to "student" with the correct query parameters', () => {
    const student: Student = { id: 123, name: 'Juan Perez' };
    component.onStudentSelected(student);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['student'], {
      queryParams: { id: 123 }
    });
  });

  // Prueba del método getStudents
  it('should fetch students and assign them to students property', () => {
    const mockStudents: Student[] = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];

    // Configura el mock del servicio
    mockStudentService.getStudents.and.returnValue(of(mockStudents));

    // Llama manualmente a ngOnInit para ejecutar getStudents
    component.ngOnInit();

    // Verifica que el servicio haya sido llamado exactamente una vez
    expect(mockStudentService.getStudents).toHaveBeenCalledTimes(1);

    // Verifica que la propiedad students haya sido actualizada con los datos simulados
    expect(component.students).toEqual(mockStudents);
  });
});
