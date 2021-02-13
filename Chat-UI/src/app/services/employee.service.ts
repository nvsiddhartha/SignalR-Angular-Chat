import { Injectable } from '@angular/core';
import { Employee } from '../models/order';

const PROFILES = [
  {id: 'dev', name: 'Developer'},
  {id: 'man', name: 'Manager'},
  {id: 'dir', name: 'Director'},
  {id: 'tst', name: 'Tester'}
];
const SKILLS = [
  {id: 'java', name: 'Java'},
  {id: 'angular', name: 'Angular'},
  {id: 'spring', name: 'Spring'},
  {id: 'hibernate', name: 'Hibernate'},
  {id: 'oracle', name: 'Oracle'}  
];

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  getProfiles() {
    return PROFILES;
  }

  getSkills() {
    return SKILLS;
  }

  saveEmployee(emp: Employee) {
     console.log(emp);  
  }
}
