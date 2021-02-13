import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile, Skill } from '../models/order';
import { EmployeeService } from '../services/employee.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  allProfiles: Array<Profile>;
  allSkills: Array<Skill>;

  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { 
  }

  ngOnInit() {
    this.allProfiles = this.empService.getProfiles();
    this.allSkills = this.empService.getSkills();
    this._allSkills$.next(this.allSkills);
  }

  empForm = this.formBuilder.group({
    name: ['', Validators.required],
    profile: ['', Validators.required],
    skills: [null, Validators.required]
  });

  private _allSkills$ = new BehaviorSubject<any>(1);

  get allSkills$(): Observable<any> {
    return this._allSkills$.asObservable();
  }

  get name() {
    return this.empForm.get('name');
  }

  get profile() {
    return this.empForm.get('profile');
  }

  get skills() {
    return this.empForm.get('skills');
  }

  onFormSubmit() {
    this.empService.saveEmployee(this.empForm.value);
    this.resetForm();
  }

  setDefault() {
    let employee = {
      name: 'Amit Shah',
      profile: this.allProfiles[2],
      skills: [this.allSkills[1], this.allSkills[2]]
    };
    this.empForm.setValue(employee);
  }

  setDefaultSkills() {

    this.allSkills$.subscribe(
      d => {
        this.skills.setValue([...d]);
      }
    );
    //this.skills.setValue([{id: 'angular', name: 'Angular'}, {id: 'spring', name: 'Spring'}]);
  }

  resetForm() {
    this.empForm.reset();
  }
}
